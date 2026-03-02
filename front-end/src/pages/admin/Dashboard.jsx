import "./Dashboard.css";

export default function AdminDashboard() {
	return (
		<div className="admin-shell">
			<aside className="admin-sidebar">
				<div className="brand">
					<span className="brand-mark">ARC</span>
					<span className="brand-name">Admin Console</span>
				</div>
				<nav className="nav">
					<button className="nav-item active">Dashboard</button>
					<button className="nav-item">Student Groups</button>
					<button className="nav-item">Lecturers</button>
					<button className="nav-item">Assignments</button>
					<button className="nav-item">Integrations</button>
					<button className="nav-item">Settings</button>
				</nav>
				<div className="sidebar-footer">
					<p className="muted">Spring 2026</p>
					<button className="btn btn-outline">Upgrade</button>
				</div>
			</aside>

			<main className="admin-main">
				<header className="admin-topbar">
					<div className="search">
						<input placeholder="Search groups, lecturers..." />
					</div>
					<div className="topbar-actions">
						<button className="btn btn-light">Export</button>
						<button className="btn btn-primary">Create Group</button>
						<div className="avatar">AD</div>
					</div>
				</header>

				<section className="admin-hero">
					<div>
						<h1>Admin Dashboard</h1>
						<p>
							Manage student groups, lecturers, assignments, and
							integrations in one place.
						</p>
					</div>
					<div className="hero-actions">
						<button className="btn btn-outline">View Reports</button>
						<button className="btn btn-primary">Add Lecturer</button>
					</div>
				</section>

				<section className="stat-cards">
					<div className="stat-card card-blue">
						<p>Student Groups</p>
						<h3>24</h3>
						<span>+3 this month</span>
					</div>
					<div className="stat-card card-purple">
						<p>Total Students</p>
						<h3>168</h3>
						<span>92% active</span>
					</div>
					<div className="stat-card card-green">
						<p>Lecturers</p>
						<h3>12</h3>
						<span>2 new this term</span>
					</div>
					<div className="stat-card card-orange">
						<p>Unassigned Groups</p>
						<h3>5</h3>
						<span>Need assignment</span>
					</div>
				</section>

				<section className="admin-sections">
					<div className="panel panel-wide">
						<div className="panel-header">
							<h2>Manage Student Groups</h2>
							<div className="panel-actions">
								<input placeholder="Search group..." />
								<button className="btn btn-light">Add Group</button>
							</div>
						</div>
						<div className="table">
							<div className="table-row table-head">
								<span>Group</span>
								<span>Students</span>
								<span>Status</span>
								<span>Lecturer</span>
								<span>Actions</span>
							</div>
							<div className="table-row">
								<span>Group A - Capstone 1</span>
								<span>7</span>
								<span className="badge badge-ok">Active</span>
								<span>Nguyen Minh Tri</span>
								<span>
									<button className="link-btn">View</button>
									<button className="link-btn">Edit</button>
								</span>
							</div>
							<div className="table-row">
								<span>Group B - Capstone 1</span>
								<span>6</span>
								<span className="badge badge-warn">Pending</span>
								<span>Unassigned</span>
								<span>
									<button className="link-btn">Assign</button>
									<button className="link-btn">Edit</button>
								</span>
							</div>
							<div className="table-row">
								<span>Group C - Capstone 2</span>
								<span>8</span>
								<span className="badge badge-ok">Active</span>
								<span>Tran Thu Ha</span>
								<span>
									<button className="link-btn">View</button>
									<button className="link-btn">Edit</button>
								</span>
							</div>
						</div>
					</div>

					<div className="panel">
						<h2>Assign Lecturer</h2>
						<p className="muted">
							Quick assignment for unassigned groups.
						</p>
						<form className="form-grid">
							<label>
								Group
								<select>
									<option>Group B - Capstone 1</option>
									<option>Group D - Capstone 2</option>
									<option>Group E - Capstone 2</option>
								</select>
							</label>
							<label>
								Lecturer
								<select>
									<option>Le Quoc Viet</option>
									<option>Nguyen Minh Tri</option>
									<option>Tran Thu Ha</option>
								</select>
							</label>
							<div className="form-actions">
								<button className="btn btn-primary" type="button">
									Assign
								</button>
								<button className="btn btn-light" type="button">
									Clear
								</button>
							</div>
						</form>
					</div>

					<div className="panel panel-wide">
						<div className="panel-header">
							<h2>Manage Lecturers</h2>
							<div className="panel-actions">
								<input placeholder="Search lecturer..." />
								<button className="btn btn-light">Add Lecturer</button>
							</div>
						</div>
						<div className="table">
							<div className="table-row table-head">
								<span>Name</span>
								<span>Expertise</span>
								<span>Groups</span>
								<span>Availability</span>
								<span>Actions</span>
							</div>
							<div className="table-row">
								<span>Nguyen Minh Tri</span>
								<span>Web, DevOps</span>
								<span>3</span>
								<span className="badge badge-ok">Available</span>
								<span>
									<button className="link-btn">Profile</button>
									<button className="link-btn">Edit</button>
								</span>
							</div>
							<div className="table-row">
								<span>Tran Thu Ha</span>
								<span>UI/UX</span>
								<span>2</span>
								<span className="badge badge-warn">Limited</span>
								<span>
									<button className="link-btn">Profile</button>
									<button className="link-btn">Edit</button>
								</span>
							</div>
						</div>
					</div>

					<div className="panel">
						<h2>Jira Integration</h2>
						<p className="muted">Configure Jira base URL and token.</p>
						<form className="form-grid">
							<label>
								Jira URL
								<input placeholder="https://your-domain.atlassian.net" />
							</label>
							<label>
								API Token
								<input placeholder="Paste token" type="password" />
							</label>
							<div className="form-actions">
								<button className="btn btn-primary" type="button">
									Save
								</button>
								<button className="btn btn-light" type="button">
									Test
								</button>
							</div>
						</form>
					</div>

					<div className="panel">
						<h2>GitHub Integration</h2>
						<p className="muted">Connect repository and webhooks.</p>
						<form className="form-grid">
							<label>
								Organization
								<input placeholder="fptu-capstone" />
							</label>
							<label>
								Repository
								<input placeholder="capstone-project" />
							</label>
							<label>
								Webhook Secret
								<input placeholder="Generate secret" type="password" />
							</label>
							<div className="form-actions">
								<button className="btn btn-primary" type="button">
									Save
								</button>
								<button className="btn btn-light" type="button">
									Verify
								</button>
							</div>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
}
