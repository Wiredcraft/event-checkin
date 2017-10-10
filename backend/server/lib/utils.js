'use strict';

// copy from: https://github.com/strongloop/loopback/issues/651#issuecomment-258723545
function disableAllMethods(model, methodsToExpose) {
  if (model && model.sharedClass) {
    methodsToExpose = methodsToExpose || [];

    const methods = model.sharedClass.methods();
    const relationMethods = [];

    try {
      relationMethods.push({ name: 'prototype.patchAttributes' });
      Object.keys(model.definition.settings.relations).forEach(function(relation) {
        relationMethods.push({ name: 'prototype.__findById__' + relation });
        relationMethods.push({ name: 'prototype.__destroyById__' + relation });
        relationMethods.push({ name: 'prototype.__updateById__' + relation });
        relationMethods.push({ name: 'prototype.__exists__' + relation });
        relationMethods.push({ name: 'prototype.__link__' + relation });
        relationMethods.push({ name: 'prototype.__get__' + relation });
        relationMethods.push({ name: 'prototype.__create__' + relation });
        relationMethods.push({ name: 'prototype.__update__' + relation });
        relationMethods.push({ name: 'prototype.__destroy__' + relation });
        relationMethods.push({ name: 'prototype.__unlink__' + relation });
        relationMethods.push({ name: 'prototype.__count__' + relation });
        relationMethods.push({ name: 'prototype.__delete__' + relation });
      });
    } catch (err) {}

    methods.concat(relationMethods).forEach(function(method) {
      if (methodsToExpose.indexOf(method.name) < 0) {
        model.disableRemoteMethodByName(method.name);
      }
    });
  }
};

module.exports = { disableAllMethods };
