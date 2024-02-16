var active = ["", "", ""]
var src = "resources/logo.svg"

if(window.location.href.endsWith("/home")){
    active[0] = "active"
}
if(window.location.href.endsWith("/about")){
    active[1] = "active"
}
if(window.location.href.endsWith("/dashboard")){
    active[2] = "active"
}
if(window.location.href.includes("/challengeSelect")){
    active[2] = "active"
    src = "../../resources/logo.svg"
}


const html = `
<nav class="navbar navbar-expand-md navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/home">
                <img src="${src}" width="30" height="30" class="d-inline-block align-top" alt="">
                Dart CTF
            </a>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link ${active[0]}" aria-current="page" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${active[1]}" href="/about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${active[2]}" id="dashboardLink" href="/dashboard">Dashboard</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <a id="login" class="btn btn-success" type="submit" data-toggle="modal" data-target="#loginModal">Login</a>
                </div>
            </div>

        </div>
    </nav>
`

const element = document.createElement("div");
element.innerHTML = html;

document.body.append(element);