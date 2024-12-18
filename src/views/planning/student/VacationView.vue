<template>
  <div class="vacation-view">
    <el-card class="vacation-card">
      <template #header>
        <div class="card-header">
          <h2>Gestion des Congés</h2>
          <el-button type="primary" @click="showAddDialog">
            Nouvelle Demande
          </el-button>
        </div>
      </template>

      <!-- Filtres -->
      <div class="filters">
        <el-select v-model="selectedStatus" placeholder="Statut" clearable @change="filterVacations">
          <el-option label="En attente" value="pending" />
          <el-option label="Approuvé" value="approved" />
          <el-option label="Refusé" value="rejected" />
        </el-select>

        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="→"
          start-placeholder="Date début"
          end-placeholder="Date fin"
          @change="filterVacations"
        />
      </div>

      <!-- Liste des congés -->
      <el-table :data="filteredVacations" v-loading="loading">
        <el-table-column label="Élève">
          <template #default="{ row }">
            <div class="student-info">
              <el-avatar :size="32">
                {{ getInitials(row.student || { firstname: 'N/A', lastname: 'N/A' }) }}
              </el-avatar>
              <span>
                {{ row.student ? `${row.student.firstname} ${row.student.lastname}` : 'N/A' }}
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Période">
          <template #default="{ row }">
            {{ formatDate(row.startDate) }} → {{ formatDate(row.endDate) }}
          </template>
        </el-table-column>

        <el-table-column prop="reason" label="Motif" show-overflow-tooltip />

        <el-table-column label="Statut" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">
              {{ formatStatus(row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Actions" width="180" align="center">
          <template #default="{ row }">
            <el-tooltip content="Modifier" placement="top" v-if="row.status === 'pending'">
              <el-button 
                type="primary" 
                circle
                size="small" 
                @click="editVacation(row)"
              >
                <Icon icon="mdi:pencil" />
              </el-button>
            </el-tooltip>

            <el-tooltip content="Supprimer" placement="top" v-if="row.status === 'pending'">
              <el-button
                type="danger"
                circle
                size="small"
                @click="deleteVacation(row)"
              >
                <Icon icon="mdi:delete" />
              </el-button>
            </el-tooltip>

            <el-tooltip content="Approuver" placement="top" v-if="row.status === 'pending'">
              <el-button
                type="success"
                circle
                size="small"
                @click="approveVacation(row)"
              >
                <Icon icon="mdi:check" />
              </el-button>
            </el-tooltip>

            <el-tooltip content="Rejeter" placement="top" v-if="row.status === 'pending'">
              <el-button
                type="warning"
                circle
                size="small"
                @click="rejectVacation(row)"
              >
                <Icon icon="mdi:close" />
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Dialog d'ajout/modification -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEditing ? 'Modifier la demande' : 'Nouvelle demande'"
      width="500px"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="Période" required>
          <el-date-picker
            v-model="form.dateRange"
            type="daterange"
            range-separator="→"
            start-placeholder="Date début"
            end-placeholder="Date fin"
          />
        </el-form-item>

        <el-form-item label="Motif" required>
          <el-input
            v-model="form.reason"
            type="textarea"
            :rows="3"
            placeholder="Décrivez le motif de votre demande..."
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">Annuler</el-button>
        <el-button type="primary" @click="saveVacation" :loading="saving">
          {{ isEditing ? 'Modifier' : 'Soumettre' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Icon } from '@iconify/vue';

interface Student {
  id: number;
  firstname: string;
  lastname: string;
}

interface Vacation {
  id: number;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  student: Student;
  comment?: string;
}

// États
const loading = ref(false);
const saving = ref(false);
const dialogVisible = ref(false);
const isEditing = ref(false);
const vacations = ref<Vacation[]>([]);
const selectedStatus = ref<string | null>(null);
const dateRange = ref<[Date, Date] | null>(null);

const form = ref({
  dateRange: null as [Date, Date] | null,
  reason: ''
});

// Computed
const filteredVacations = computed(() => {
  return filterVacations();
});

// Méthodes
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR');
};

const formatStatus = (status: string) => {
  const statuses: Record<string, string> = {
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Refusé'
  };
  return statuses[status] || status;
};

const getStatusType = (status: string): string => {
  const types: Record<string, string> = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  };
  return types[status] || 'info';
};

const getInitials = (student: Student): string => {
  return `${student.firstname[0]}${student.lastname[0]}`.toUpperCase();
};

const loadVacations = async () => {
  loading.value = true;
  try {
    // Récupérer l'ID de l'étudiant connecté ou sélectionné
    const studentId = 1; // À remplacer par l'ID réel de l'étudiant
    
    const result = await window.ipcRenderer.invoke('vacation:getByStudent', studentId);
    if (result.success) {
      vacations.value = result.data.map((vacation: any) => ({
        ...vacation,
        student: vacation.student || { firstname: 'N/A', lastname: 'N/A' }
      }));
    } else {
      throw new Error(result.message || 'Erreur lors du chargement');
    }
  } catch (error) {
    console.error('Erreur:', error);
    ElMessage.error('Erreur lors du chargement des congés');
  } finally {
    loading.value = false;
  }
};

const showAddDialog = () => {
  isEditing.value = false;
  form.value = {
    dateRange: null,
    reason: ''
  };
  dialogVisible.value = true;
};

const saveVacation = async () => {
  if (!form.value.dateRange || !form.value.reason) {
    ElMessage.warning('Veuillez remplir tous les champs');
    return;
  }

  saving.value = true;
  try {
    const studentId = 1; // À remplacer par l'ID réel de l'étudiant
    const [startDate, endDate] = form.value.dateRange;
    const data = {
      id: undefined,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(), 
      reason: form.value.reason,
      status: 'pending',
      studentId
    };

    const result = await window.ipcRenderer.invoke(
      isEditing.value ? 'vacation:update' : 'vacation:create',
      data
    );

    if (result.success) {
      ElMessage.success(isEditing.value ? 'Demande modifiée' : 'Demande soumise');
      dialogVisible.value = false;
      await loadVacations();
    } else {
      throw new Error(result.message || 'Erreur lors de la sauvegarde');
    }
  } catch (error) {
    console.error('Erreur:', error);
    ElMessage.error('Erreur lors de la sauvegarde');
  } finally {
    saving.value = false;
  }
};

const deleteVacation = async (vacation: Vacation) => {
  try {
    await ElMessageBox.confirm(
      'Êtes-vous sûr de vouloir supprimer cette demande ?',
      'Confirmation',
      {
        type: 'warning'
      }
    );

    const result = await window.ipcRenderer.invoke('vacation:delete', vacation.id);
    if (result.success) {
      ElMessage.success('Demande supprimée');
      loadVacations();
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Erreur lors de la suppression');
    }
  }
};

const filterVacations = () => {
  if (!vacations.value) return [];
  
  let filtered = [...vacations.value];

  if (selectedStatus.value) {
    filtered = filtered.filter(v => v.status === selectedStatus.value);
  }

  if (dateRange.value) {
    const [start, end] = dateRange.value;
    filtered = filtered.filter(v => {
      const vacationStart = new Date(v.startDate);
      const vacationEnd = new Date(v.endDate);
      return vacationStart >= start && vacationEnd <= end;
    });
  }

  return filtered;
};

const editVacation = (vacation: Vacation) => {
  isEditing.value = true;
  form.value = {
    dateRange: [new Date(vacation.startDate), new Date(vacation.endDate)],
    reason: vacation.reason
  };
  dialogVisible.value = true;
};

const approveVacation = async (vacation: Vacation) => {
  try {
    await ElMessageBox.confirm(
      'Êtes-vous sûr de vouloir approuver cette demande ?',
      'Confirmation',
      {
        confirmButtonText: 'Approuver',
        cancelButtonText: 'Annuler',
        type: 'success'
      }
    );

    const result = await window.ipcRenderer.invoke('vacation:update', {
      id: vacation.id,
      status: 'approved'
    });

    if (result.success) {
      ElMessage.success('Demande approuvée');
      await loadVacations();
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Erreur lors de la réjection');
    }
  }
};

const rejectVacation = async (vacation: Vacation) => {
  try {
    await ElMessageBox.confirm(
      'Êtes-vous sûr de vouloir rejeter cette demande ?',
      'Confirmation',
      {
        confirmButtonText: 'Rejeter',
        cancelButtonText: 'Annuler',
        type: 'warning'
      }
    );

    const result = await window.ipcRenderer.invoke('vacation:update', {
      id: vacation.id,
      status: 'rejected'
    });

    if (result.success) {
      ElMessage.success('Demande rejetée');
      await loadVacations();
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('Erreur lors de la réjection');
    }
  }
};

// Initialisation
loadVacations();
</script>

<style scoped>
.vacation-view {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.student-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

:deep(.el-select) {
  width: 200px;
}
</style> 