import { makeObservable, observable, action } from 'mobx';

class StoreSidebar {
  sidebarOpen = false;
  openMenus = [];
  constructor() {
    makeObservable(this, {
      sidebarOpen: observable,
      openMenus: observable,
      setSidebarOpen: action,
      setOpenMenus: action,
      toggleMenu: action
    });
}

setSidebarOpen(isOpen) {
  this.sidebarOpen = isOpen;
}

setOpenMenus(menus) {
  this.openMenus = menus;
}
toggleMenu(index) {
    if (this.openMenus.includes(index)) {
      this.openMenus = this.openMenus.filter((item) => item !== index);
    } else {
      this.openMenus = [...this.openMenus, index];
    }
  }
}
export const sidebarStore = new StoreSidebar();