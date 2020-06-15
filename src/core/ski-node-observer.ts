export default abstract class SkiNodeObserver {

  protected readonly attributeFilter?: string[];
  static readonly attributeOldValue?: boolean;
  static readonly attributes?: boolean;
  static readonly characterData?: boolean;
  static readonly characterDataOldValue?: boolean;
  static readonly childList?: boolean;
  static readonly subtree?: boolean;

  private mutationObserver: MutationObserver;
  
  constructor(protected root: Node) {
    // TODO: reuse MutationObserver since several are created for the same root ?
    this.mutationObserver = new MutationObserver(mutationsList => 
      mutationsList.forEach(record => this.onChange(record)));
  }
  
  init() {
    let nodeClass = <typeof SkiNodeObserver>this.constructor;
    this.mutationObserver.observe(this.root, {
      attributeFilter: this.attributeFilter,
      attributeOldValue: nodeClass.attributeOldValue,
      attributes: nodeClass.attributes,
      characterData: nodeClass.characterData,
      characterDataOldValue: nodeClass.characterDataOldValue,
      childList: nodeClass.childList,
      subtree: nodeClass.subtree
    });

    this.updateTree(this.root);
    return this;
  }
  
  protected onChange(record: MutationRecord) {
    record.addedNodes?.forEach(this.updateTree, this);
    record.removedNodes?.forEach(this.detachTree, this);
  }

  disconnect() {
    this.mutationObserver.disconnect();
    this.detachTree(this.root);
  }

  protected abstract updateTree(node: Node);

  protected abstract detachTree(node: Node);

}