/**
 * Inertia page routes.
 *
 * These routes render Vue page components with server-provided props, replacing
 * the mock data that previously lived inline in the .vue files. They query the
 * same Mongoose models the JSON API controllers use.
 *
 * The existing JSON API (routes/api_routes.js) is left intact during migration.
 */

const routes = require('express').Router();
const { authenticated, adminOnly } = require('../classes/AuthMiddleware');

const Users      = require('../models/db_Innova_users');
const Tickets    = require('../models/db_ticket');
const Department = require('../models/db_Department');

const Auth_user  = require('../controllers/admin/innovausers');
const auth_user  = new Auth_user();

// Helpers ------------------------------------------------------------------

function serialize(doc)
{
    return JSON.parse(JSON.stringify(doc));
}

async function ticketsBy(filter)
{
    const model = new Tickets();
    const list = await model.find(filter);
    return serialize(list);
}

// Auth ---------------------------------------------------------------------

routes.get('/login', (req, res) =>
{
    const errors = (req.session && req.session.errors) || {};
    if (req.session) req.session.errors = undefined;
    // If already authenticated, bounce to the right home.
    if (req.session && req.session.user)
    {
        return res.redirect(String(req.session.user.user_role) === '1' ? '/admin' : '/');
    }
    return res.inertia('Auth/Login', { errors });
});

routes.post('/login', (req, res) => auth_user.logIn(req, res));
routes.post('/logout', (req, res) => auth_user.logOut(req, res));

// Member pages -------------------------------------------------------------

routes.get('/', authenticated, async (req, res) =>
{
    const dept = req.logged_in_user.department;
    const model = new Tickets();
    const [ongoing, closed, resolved] = await Promise.all([
        model.find({ status: 'Assigned', submitted_to: dept }),
        model.find({ status: 'Closed', department: dept }),
        model.find({ status: 'Resolved', department: dept }),
    ]);
    return res.inertia('Dashboard/Dashboard', {
        counters: {
            pending: ongoing.length,
            closed: closed.length,
            resolved: resolved.length,
        },
    });
});

routes.get('/TaskList', authenticated, async (req, res) =>
{
    const me = req.logged_in_user;
    const [myTask, submitted, forReview] = await Promise.all([
        ticketsBy({ assignee: me._id, status: 'Assigned' }),
        ticketsBy({ created_by: me._id, status: { $in: ['Open', 'Assigned'] } }),
        ticketsBy({ created_by: me._id, status: 'Resolved' }),
    ]);
    return res.inertia('TaskList/TaskList', { myTask, submitted, forReview });
});

routes.get('/DepartmentTask', authenticated, async (req, res) =>
{
    const dept = req.logged_in_user.department;
    const [ongoing, forApproval, forReview, done] = await Promise.all([
        ticketsBy({ submitted_to: dept, status: 'Assigned' }),
        ticketsBy({ submitted_to: dept, status: 'Open' }),
        ticketsBy({ submitted_to: dept, status: 'Resolved' }),
        ticketsBy({ department: dept, status: 'Closed' }),
    ]);
    return res.inertia('DepartmentTask/DepartmentTask', { ongoing, forApproval, forReview, done });
});

routes.get('/EmployeeList', authenticated, async (req, res) =>
{
    const users = new Users();
    const dept = req.logged_in_user.department;
    const list = serialize(await users.find({ department: dept, status: 1 }));
    return res.inertia('EmployeeList/EmployeeList', { employees: list });
});

// Admin pages --------------------------------------------------------------

routes.get('/admin', adminOnly, async (req, res) =>
{
    const model = new Tickets();
    const [open, assigned, resolved, closed] = await Promise.all([
        model.find({ status: 'Open' }),
        model.find({ status: 'Assigned' }),
        model.find({ status: 'Resolved' }),
        model.find({ status: 'Closed' }),
    ]);
    return res.inertia('admin/admindashboard', {
        counters: {
            open: open.length,
            assigned: assigned.length,
            resolved: resolved.length,
            closed: closed.length,
        },
    });
});

routes.get('/admin/DepartmentManagement', adminOnly, async (req, res) =>
{
    const dept = new Department();
    const list = serialize(await dept.find({}));
    return res.inertia('admin/DepartmentManagement', { departments: list });
});

routes.get('/admin/EmployeeManagement', adminOnly, async (req, res) =>
{
    const users = new Users();
    const list = serialize(await users.find({}));
    return res.inertia('admin/EmployeeManagement', { employees: list });
});

routes.get('/admin/JobOrderCategoryManagement', adminOnly, (req, res) =>
{
    return res.inertia('admin/JobOrderCategoryManagement', { categories: [] });
});

routes.get('/admin/Reports', adminOnly, (req, res) =>
{
    return res.inertia('admin/Reports', { reports: [] });
});

routes.get('/admin/BackupAndRestore', adminOnly, (req, res) =>
{
    return res.inertia('admin/BackupAndRestore', {});
});

routes.get('/admin/AuditTrail', adminOnly, (req, res) =>
{
    return res.inertia('admin/AuditTrail', { entries: [] });
});

module.exports = routes;
