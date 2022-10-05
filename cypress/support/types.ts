export class CommandInstaller {
  public parent?: object
  public child?: object
  public dual?: object

  constructor(parent: object, child: object, dual: object) {
    this.parent = parent
    this.child = child
    this.dual = dual
  }
}
