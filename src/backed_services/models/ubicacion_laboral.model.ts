import type UserModel from '~/backed_services/models/user.model'
import type AreaModel from '~/backed_services/models/area.model'

export default class UbicacionLaboralModel {
    posiblegraduado:
    area: AreaModel | undefined
    esPreubicacion: boolean
    fechaAsignado:
}


class UbicacionLaboralAdelantada(models.Model):
posiblegraduado = models.ForeignKey(userModels.PosibleGraduado, on_delete=models.RESTRICT)
area = models.ForeignKey(simpleModels.Area, on_delete=models.RESTRICT)
esPreubicacion = models.BooleanField(default=True)
fechaAsignado = models.DateTimeField(auto_now=True)


