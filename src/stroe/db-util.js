import {db} from './db'

// 메뉴등록 curd
export const get = () => {
  return db.topics;
}

export const getId = (id) => {
  return db.topics.find(i => i.id === id);
}

export const save = (item) => {
  //기존의 인텍스를 조회해서 증가한 후
  const items = get();
  const sItems = items.sort((a, b)=>{if(a.id > b.id) return -1;});
  const maxIdx = items.length == 0 ? 1 : sItems[0].id+1;
  const newItem = {id: maxIdx, title: item.title, body: item.body};
  // console.log(newItem,sItems);
  //마지막에 아이템을 추가합니다. 
  db.topics.push(newItem);

  return newItem;
}

export const update = (item) => {
  const items = get();
  //마지막에 아이템을 변경합니다. 
  // db.topics = items.filter(i => i.id != item.id); //, item];
  // db.topics.push(item);
  const updatedItem = {id: parseInt(item.id), title: item.title, body: item.body};
  db.topics = [...items.filter(i => i.id != updatedItem.id), updatedItem];
  console.log(db.topics)
  
  return updatedItem;
}


export const item_delete = (item) => {
  const items = get();
  db.topics = [...items.filter(i => i.id != item.id)];
}

// 사용자 계정 CRUD
export const allUsers = () => {
  return db.users;
}
export const newUser = (u) => {  
  const items = allUsers();
  const sortItems = items.sort((a, b)=>{if(a.id > b.id) return -1;});
  const maxIdx = items.length == 0 ? 1 : sortItems[0].id+1;
  const newItem = {id: maxIdx, userName: u.userName, deviceId: u.deviceId, isAdmin: false};
  db.users.push(newItem);
  // console.log('db util:',db.users);
  return newItem;
}
export const updateUser = (user) => {
  const users = allUsers()
  db.users = [...users.filter(i => i.id != user.id), user]
}
export const deleteUseryId = (id) => {
  const user = getUserById(id)
  db.users.pop(user);
}
export const getUserById = (id) => {
  return db.users.filter(user => user.id === id)
}