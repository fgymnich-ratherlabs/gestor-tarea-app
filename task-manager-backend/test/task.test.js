const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('../routes/tasks');
const sequelize = require('../config/db');
const Task = require('../models/Task');
const { expect } = require('chai');

const app = express();
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

describe('Tasks API', () => {
  before(async () => {
    await sequelize.sync({ force: true });
  });

  //limpia la DB de testing
  beforeEach(async () => {
    await Task.destroy({ where: {} });
  });

  it('should get all tasks', async () => {
    await Task.create({ name: 'Test Task 1' });
    await Task.create({ name: 'Test Task 2' });

    const response = await request(app).get('/tasks');
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(2);
  });

  it('should create a new task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ name: 'New Task' });

    expect(response.status).to.equal(201);
    expect(response.body.name).to.equal('New Task');
  });

  it('should delete a task', async () => {
    const task = await Task.create({ name: 'Task to Delete' });

    const response = await request(app).delete(`/tasks/${task.id}`);
    expect(response.status).to.equal(200);

    const tasks = await Task.findAll();
    expect(tasks.length).to.equal(0);
  });

  it('should update a task', async () => {
    const task = await Task.create({ name: 'Old Task Name' });

    const response = await request(app)
      .put(`/tasks/${task.id}`)
      .send({ name: 'Updated Task Name' });

    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal('Updated Task Name');
  });
});
