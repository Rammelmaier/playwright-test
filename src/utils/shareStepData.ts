class StepMemory {
  private memory;

  constructor() {
    this.memory = new Map();
  }

  save<T>(key: string, value: T): void {
    if (this.memory.has(key)) {
      throw new Error(`You tried to override "${key}" property. This is not allowed`);
    }
    this.memory.set(key, value)
  }

  notProtectedSave<T>(key: string, value: T): void {
    this.memory.set(key, value);
  }

  load<T>(key: string): T {
    if (this.memory.has(key)) {
      return this.memory.get(key)
    }
    throw new Error(`You tried to access ${key} property, but it does not exist.`);
  }

  notProtectedLoad<T>(key: string): T {
    return this.memory.get(key);
  }
}

export default new StepMemory();
