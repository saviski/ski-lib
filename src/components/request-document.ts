declare global {

  interface Body {
    document(): Promise<DocumentFragment>;
  }
  
}

Response.prototype.document = async function () {
  let text = await this.text();
  let template = document.createElement('template');
  template.innerHTML = text;
  return template.content;
}

export {}