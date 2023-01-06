import AuthStore from '~/modules/authentication/store/auth.store'

export function is_authenticated(): boolean {
  return AuthStore().user !== undefined
}

export function is_superuser(): boolean {
  if (!is_authenticated())
    return false
  return true
  //return AuthStore().user.groups.length === 0
}

export function is_vicerrector(): boolean {
  if (!is_authenticated())
    return false
  return AuthStore().user.groups.find(item => item.name == 'VICERRECTOR') || is_superuser()
}

export function is_director_recursos_humanos(): boolean {
  if (!is_authenticated())
    return false
  return AuthStore().user?.groups.find(item => item.name == 'DIRECTOR RECURSOS HUMANOS') || is_superuser()
}

export function is_jefe_area(): boolean {
  if (!is_authenticated())
    return false
  return AuthStore().user?.groups.find(item => item.name == 'JEFE DE AREA') || is_superuser()
}

export function is_tutor(): boolean {
  if (!is_authenticated())
    return false
  return AuthStore().user?.groups.find(item => item.name == 'TUTOR') || is_superuser()
}

export function is_joven(): boolean {
  return is_estudiante() || is_graduado()
}

export function is_graduado(): boolean {
  if (!is_authenticated())
    return false
  return AuthStore().user?.groups.find(item => item.name == 'GRADUADO') || is_superuser()
}

export function is_posible_graduado(): boolean {
  if (!is_authenticated())
    return false
  return AuthStore().user?.groups.find(item => item.name == 'POSIBLE GRADUADO') || is_superuser()
}

export function is_estudiante(): boolean {
  if (!is_authenticated())
    return false
  return AuthStore().user?.groups.find(item => item.name == 'ESTUDIANTE') || is_superuser()
}

