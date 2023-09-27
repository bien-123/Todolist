import { useEffect, useState } from 'react';
import { Button, Input, Table, Form } from 'antd';
import React from 'react';
import { listHits } from '../axios';

function Todolist() {
  const [data, setData] = useState(listHits);
  console.log(data);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [indexItem, setIndexItem] = useState(0);
  useEffect(() => {
      const taskTitles = listHits.map((item: any) => item.title)
      setTasks(taskTitles)
  }, [listHits]);
  // console.log(listHits);

  const handleAddTask = () => {
    if(task.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks.push(task);
      setTasks(updatedTasks);
      setTask('');
    }
  };

  const handleGetDataUpdateTask = (index: any) => {
      const selectedTask = listHits[index].title;
      // handleUpdateTask(index, selectedTask);
      setTask(selectedTask);
      setIndexItem(index)
  };

  const handleUpdateTask = () => {
    let arrayUpdate: any = []
    if (task.trim() !== '') {
        listHits.map((item: any) => {
            if(item.id - 1=== indexItem) {
                item.title = task
            }
            arrayUpdate.push(item)
        })
        arrayUpdate = arrayUpdate.map((item: any) => item.title)
        setTasks(arrayUpdate)
        setTask('');
      }
  }

  const handleRemoveTask = (index: any) => {
    const updateTasks = tasks.filter((_, i) => i !== index);
    setTasks(updateTasks);
  };

  const handleCancelTask = (index: any) => {
    setTask('');
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <Form  style={{ display: 'flex', gap: '8px' }}>
      <Form.Item>
        <Input
          placeholder="New Task"
          value={task}
          onChange={e => setTask(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleCancelTask}>
          Hủy
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleAddTask}>
          Add Task
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleUpdateTask}>
          Update Task
        </Button>
      </Form.Item>
    </Form>
      <Table
      dataSource={tasks.map((item, index) => ({ key: index, task: item }))}
      columns={[
        {
          title: 'Task',
          dataIndex: 'task',
          width: 1200,
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          render: (text, record) => (
            <>
                <Button type="link" onClick={() => handleGetDataUpdateTask(record.key)}>
                    Update
                </Button>
                <Button type="link" onClick={() => handleRemoveTask(record.key)}>
                    Remove
                </Button>
            </>
          ),
        },
      ]}
    />
    </div>
  );
}

export default Todolist;
