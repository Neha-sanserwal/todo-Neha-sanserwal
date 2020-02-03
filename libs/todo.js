const getRandomId = function() {
  const randomId = Math.random() * Math.pow(10, 10);
  return Math.floor(randomId);
};
class Todo {
  constructor(newEntry, logs) {
    this.newEntry = { ...newEntry };
    this.logs = [...logs];
  }
  static parseEntryItem(newEntry) {
    const status = '';
    const taskId = getRandomId();
    const bucketId = newEntry.bucketId;
    const text = newEntry.task;
    return { status, taskId, bucketId, text };
  }
  static parseNewEntry(parser, text) {
    const newEntry = { ...parser(`?${text}`, true).query };
    newEntry.bucketId = getRandomId();
    newEntry.todoItems = [this.parseEntryItem(newEntry)];
    return newEntry;
  }
  appendTo(file, writer) {
    this.logs.unshift(this.newEntry);
    writer(file, this.logs);
  }
}

module.exports = {
  Todo
};