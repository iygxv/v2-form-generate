const modules = import.meta.globEager('./**/*.vue');
const components = Object.values(modules).map((module) => {
  return module.default || module;
});

const install = function(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};