<div class="main-sidebar">
	<aside id="sidebar-wrapper">
		<div class="sidebar-brand">
			<a href="{{ route('home') }}">QRIS Data</a>
		</div>
		

		<ul class="sidebar-menu">

			<li class="menu-header">Dashboard</li>
		
			<li class="'Main Dashboard' ">
				<a class="nav-link" href="{{ route('home') }}">
					<i class="fas fa-home"></i><span>Main Dashboard</span>
				</a>
			</li>

			<li class="'Main Dashboard' ">
				<a class="nav-link" href="{{ route('report.index') }}">
					<i class="fas fa-file"></i><span>Transaction QRIS</span>
				</a>
				<a class="nav-link" href="{{ route('transactionqris.monthly') }}">
					<i class="fas fa-file"></i><span>Transaction QRIS Monthly</span>
				</a>
			</li>

			

		

			
		</ul>
	</aside>
</div>