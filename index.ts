class Node {
  data: number;
  next: Node | null;

  constructor(data: number) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head: Node | null;
  size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(data: number): void {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  insertAt(data: number, index: number): void {
    if (index < 0 || index > this.size) {
      return console.log("Please enter a valid index.");
    } else {
      const newNode = new Node(data);
      let curr: Node | null;
      let prev: Node | null;

      curr = this.head;

      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
      } else {
        curr = this.head;
        let it = 0;

        while (it < index) {
          it++;
          prev = curr;
          curr = curr!.next;
        }

        newNode.next = curr;
        prev!.next = newNode;
      }
      this.size++;
    }
  }

  removeFrom(index: number): number | void {
    if (index < 0 || index >= this.size) {
      return console.log("Please enter a valid index.");
    } else {
      let curr: Node | null;
      let prev: Node | null;
      let it = 0;
      curr = this.head;
      prev = curr;

      if (index === 0) {
        this.head = curr!.next;
      } else {
        while (it < index) {
          it++;
          prev = curr;
          curr = curr!.next;
        }
        prev!.next = curr!.next;
      }
      this.size--;

      return curr!.data;
    }
  }

  printList(): void {
    let curr = this.head;
    let str = "";
    while (curr) {
      str += curr.data + " ";
      curr = curr.next;
    }
    console.log(str);
  }
}

const linkedList = new LinkedList();
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.insertAt(0, 0);
linkedList.printList();
linkedList.removeFrom(1);
linkedList.printList();
