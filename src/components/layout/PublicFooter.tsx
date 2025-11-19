export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer__inner">
        <span>© {new Date().getFullYear()} OfferGen. All rights reserved.</span>
      </div>
    </footer>
  );
}
