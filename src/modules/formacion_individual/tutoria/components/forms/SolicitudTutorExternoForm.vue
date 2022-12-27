<script setup lang="ts">
import { ref } from 'vue'
import type AreaModel from '../../../../../backed_services/models/area.model'
import AuthStore from '../../../../authentication/store/auth.store'
import AreaService from '../../../../../backed_services/area.services'
import { ExceptionResponse } from '../../../../../globals/config/axios'
import { checkIsAuthenticateAndRedirect, checkServerErrorAndRedirect } from '../../../../../helpers/utils'

const areas = ref<AreaModel[]>([])
const selectedAreas = ref([])
const user_area = AuthStore().user?.area

async function loadAreas() {
  try {
    const all_areas = await AreaService.all_areas()
    areas.value = all_areas.results.filter(i => i.id !== user_area.id)
  }
  catch (error: ServerError | ExceptionResponse) {
    checkServerErrorAndRedirect(error)
    checkIsAuthenticateAndRedirect(error)
  }
}

loadAreas()
</script>
