import { FriendlySpoonPage } from './app.po';

describe('friendly-spoon App', function() {
  let page: FriendlySpoonPage;

  beforeEach(() => {
    page = new FriendlySpoonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
