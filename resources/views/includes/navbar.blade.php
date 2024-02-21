<div class="navbar-bg"></div>
<nav class="navbar navbar-expand-lg main-navbar">
  <form class="form-inline mr-auto">
    <ul class="navbar-nav mr-3">
      <li><a href="#" data-toggle="sidebar" class="nav-link nav-link-lg"><i class="fas fa-bars"></i></a></li>
      <li><a href="#" data-toggle="search" class="nav-link nav-link-lg d-sm-none"><i class="fas fa-search"></i></a></li>
    </ul>
    <div class="search-element">
      <input class="form-control" type="search" placeholder="Search" aria-label="Search" data-width="250">
      <button class="btn" type="submit"><i class="fas fa-search"></i></button>
      <div class="search-backdrop"></div>
    </div>
  </form>
  <ul class="navbar-nav navbar-right">
    <li class="dropdown"><a href="#" data-toggle="dropdown" class="nav-link dropdown-toggle nav-link-lg nav-link-user">
      <img alt="image"
        src="{{ auth()->user()->photo_url ?? asset('dist/assets/img/avatar/avatar-2.png') }}"
        class="rounded-circle mr-1"
        style="height: 30px; object-fit: cover; object-position: center">
      <div class="d-sm-none d-lg-inline-block">Hi, {{Auth::user()->name ?? 'Guest'}}</div></a>
      <div class="dropdown-menu dropdown-menu-right mt-2">
        {{-- <a href="" class="dropdown-item has-icon">
          <i class="fas fa-user"></i> Profile
        </a>
        <a href="" class="dropdown-item has-icon">
          <i class="fas fa-key"></i> Ubah Password
        </a> --}}

        {{-- <div class="dropdown-divider"></div> --}}
        <form id="logout" method="POST" action="{{ route('logout') }}">
          @csrf
          <a href="javascript:{}"
            class="dropdown-item has-icon text-danger"
            onclick="swal({
              title: 'Logout',
              text: 'Anda yakin untuk keluar?',
              icon: 'warning',
              buttons: true,
            })
            .then((willProccess) => {
              if(willProccess) $('#logout').submit();
            });">
            <i class="fas fa-sign-out-alt"></i> Logout
          </a>
        </form>
      </div>
    </li>
  </ul>
</nav>