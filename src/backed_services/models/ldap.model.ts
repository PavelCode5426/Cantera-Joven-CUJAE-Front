export class UserLDAPModel {
  address: string
  email: string
  identification: string
  lastname: string
  name: string
  phone: string
  scientificCategory: string
  surname: string
  area: string
  user: string
  areaId: string
  personType: string
  personExternal: boolean
}

export class EstudianteLDAPModel extends UserLDAPModel {
  studentCourse: string
  studentYear: number
  studentGroup: number
  studentTemporal: boolean
}
