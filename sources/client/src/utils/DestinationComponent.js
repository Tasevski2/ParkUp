export default class DestinationComponent {
    constructor(path, component, exact = false) {
        this.path = path;
        this.component = component;
        this.exact = exact;
    }
}