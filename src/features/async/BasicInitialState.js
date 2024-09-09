export default class BasicInitialState {
    constructor(value) {
        this[value] = null
        this.pending = false
        this.error = null
    }
}