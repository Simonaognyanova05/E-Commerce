export default function Footer() {
    return (
        <footer className="footer-area section_gap">
            <div className="container">
                <div className="footer-bottom row align-items-center">
                    <p className="footer-text m-0 col-lg-8 col-md-12">
                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                    </p>
                    <div className="col-lg-4 col-md-12 footer-social">
                        <a href="#"><i className="fa fa-facebook"></i></a>
                        <a href="#"><i className="fa fa-twitter"></i></a>
                        <a href="#"><i className="fa fa-dribbble"></i></a>
                        <a href="#"><i className="fa fa-behance"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}