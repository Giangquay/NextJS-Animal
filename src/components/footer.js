
export default function Footer()
{
    const contentFooter = [
        {
            id:1,
            name:'About us',
        },
        {
            id:2,
            name:'Contact Us'
        },
        {
            id:3,
            name:'Sourcing Our Content'
        },
        {
            id:4,
            name:'Privacy Policy'
        }
    ]
    return (
        <div class="container-fluid" id="footer-wrapper">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-8">
                    <div class="footer-navigation">
                        <ul id="menu-footer-navigation" class="menu d-flex" >
                           {
                            contentFooter.map((value)=>{
                                return <li key={value.id}>{value.name}</li>
                            })
                           }
                        </ul>
                    </div>
                </div>
                <div class="col-md-12 col-lg-8">
                    <p class="font-weight-bold text-light">As an Amazon Associate I earn from qualifying purchases.</p>
                    <p class="font-weight-bold text-light">Learn more about us &amp; <a class="text-light"
                            href="/about/#h-affiliate-disclosure">read our affiliate disclosure</a>.</p>
                </div>
                <div class="col-md-12 col-lg-8">
                    <div class="footer-navigation"></div>
                </div>
                <div class="col-md-12 col-lg-4" id="footer-social-icons-wrapper">
                    <div>
                        <p id="copyright">Copyright © 2008 - 2023 A-Z Animals</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}