'use strict';
const router = require('express').Router();

const <%= name %>Ctrl = require('<%=controllerPath%>');

router.get('/<%= model %>/:id', <%= name %>Ctrl.get<%= name %>);

router.get('/<%= model %>', <%= name %>Ctrl.get<%= name %>);


router.post('/<%= model %>', <%= name %>Ctrl.create<%= name %>);

router.put('/<%= model %>/:id',<%= name %>Ctrl.update<%= name %>);

router.delete('/<%= model %>/:id', <%= name %>Ctrl.remove<%= name %>);

module.exports = router;