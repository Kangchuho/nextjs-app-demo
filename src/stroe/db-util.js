import {db} from './db'

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
  const updatedItem = {id: item.id, title: item.title, body: item.body};
  db.topics = [...items.filter(i => i.id != updatedItem.id), updatedItem];
  console.log(updatedItem)
  return updatedItem;
}
