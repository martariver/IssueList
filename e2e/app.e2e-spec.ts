import { ProyectoAngular4Page } from './app.po';

describe('proyecto-angular4 App', function() {
  let page: ProyectoAngular4Page;

  beforeEach(() => {
    page = new ProyectoAngular4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
