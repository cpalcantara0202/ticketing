// URL For reference of https://www.npmjs.com/package/validator

const routes                            = require('express').Router();
const middleware_class                  = require('../classes/SimpleMiddlewareClass');
const FrontAuthController               = require('../controllers/front/FrontAuthController');
const Auth_user                         = require('../controllers/admin/innovausers');
const Dept_controller                   = require('../controllers/admin/department');
const Ticket_controller                 = require('../controllers/front/Tickets/CreateTickets');
const Assign_controller                 = require('../controllers/front/Tickets/assignTickets');
const Roles_controller                  = require('../controllers/admin/role');
const View_controller                   = require('../controllers/front/Tickets/View');
const Rate_controller                   = require('../controllers/front/Tickets/rateTickets');
const Complete_controller               = require('../controllers/front/Tickets/completeticket');
const Calculate_controller              = require('../controllers/front/Tickets/calculateRating');
const Return_controller                 = require('../controllers/front/Tickets/returnTickets');
const Search_Employee                   = require('../controllers/admin/searchemployeelist');
const Counter_Employee                  = require('../controllers/admin/countemployee');
const Counter_UnitHead                  = require('../controllers/admin/countUnitHead')
const Counter_DeptTask                  = require('../controllers/admin/countDeptTask')
const Count_Pending                     = require('../controllers/admin/dashboardCounter')
const BackUpRestore                     = require('../controllers/admin/backuprestore')
const Filter_by_date                    = require('../controllers/front/Tickets/View')
const Roadblock                         = require('../controllers/front/Tickets/pending')       
const Counter_Admin                     = require('../controllers/admin/countadmin')            
const Filter                            = require('../controllers/front/reports')
const Dynamic                           = require('../controllers/admin/dynamicsearch')
const ReportController                  = require('../controllers/admin/ReportController');
const Employee_List_Ongoing             = require('../controllers/front/Tickets/getEmpListOngoing')
const GetOngoing                        = require('../controllers/front/Tickets/ongoing')
const Subject                           = require('../controllers/admin/Subject')
const View_Dept_List                    = require('../controllers/admin/viewEmpStatus')


const view_dept_list                    = new View_Dept_List()
const subject                           = new Subject();
const getongoing                        = new GetOngoing();       
const employee_list_ongoing             = new Employee_List_Ongoing();
const dynamic                           = new Dynamic();
const filter                            = new Filter();
const counter_admin                     = new Counter_Admin();
const backuprestore                     = new BackUpRestore();
const count_pending                     = new Count_Pending();
const counter_depttask                  = new Counter_DeptTask();
const counter_unithead                  = new Counter_UnitHead();
const counter_employee                  = new Counter_Employee();
const search_employee                   = new Search_Employee();
const return_controller                 = new Return_controller();
const calculate_controller              = new Calculate_controller();
const complete_controller               = new Complete_controller();
const rate_controller                   = new Rate_controller();
const view_controller                   = new View_controller();
const roles_controller                  = new Roles_controller();
const auth_user                         = new Auth_user();
const assigned_ticket                   = new Assign_controller()
const dept_controller                   = new Dept_controller()
const front_auth_controller             = new FrontAuthController();
const ticket_controller                 = new Ticket_controller();
const filter_by_date                    = new Filter_by_date();
const roadblock                         = new Roadblock();
const report_controller                 = new ReportController();

//GET
routes.post('/login',auth_user.logIn);//login 
routes.get('/get_employee_report', middleware_class.memberOnly, report_controller.employeeReport, );//login 
routes.get('/get_unithead',middleware_class.memberOnly,auth_user.getListunithead);//show list of unit heads
routes.get('/get_activeuser',middleware_class.memberOnly,dept_controller.getActive);//show active users
routes.get('/get_archiveduser',middleware_class.memberOnly,dept_controller.getArchived);//show archived users
routes.get('/rate_ticket',middleware_class.memberOnly,rate_controller.rate_tickets);//rate the ticket
routes.get('/getAllDept',middleware_class.memberOnly,dept_controller.getAllDept);//show list of department
routes.get('/calculate_rating',middleware_class.memberOnly,calculate_controller.calculateRating);//get resolved user tickets
routes.get('/unit_head_mytask',middleware_class.memberOnly,view_controller.UnitHeadMyTask);//get unit head my task
routes.get('/unit_head_submitted',middleware_class.memberOnly,view_controller.UnitHeadSubmitted);//get unit head submitted
routes.get('/unit_head_forreview',middleware_class.memberOnly,view_controller.UnitHeadForReview);//get unit head for review
routes.get('/unit_head_ongoing',middleware_class.memberOnly,view_controller.UnitHeadOngoing);//get unit head assigned dept tickets
routes.get('/unit_head_assigning',middleware_class.memberOnly,view_controller.UnitHeadForAssigning);//get unit head for assigning
routes.get('/unit_head_done',middleware_class.memberOnly,view_controller.UnitHeadDone);//get unit head done tickets
routes.get('/unit_head_inprogress',middleware_class.memberOnly,view_controller.UnitHeadInProgress);//get unit head inprogress tickets
routes.get('/rank_in_file_tasklist',middleware_class.memberOnly,view_controller.EmpMyTask);//get rank in file my task
routes.get('/rank_in_file_submitted',middleware_class.memberOnly,view_controller.EmpSubmitted);//get rank in file submitted.
routes.get('/rank_in_file_review',middleware_class.memberOnly,view_controller.EmpForReview);//get rank in file for Review.
routes.get('/rank_in_file_done',middleware_class.memberOnly,view_controller.EmpDone);//get rank in file done.
routes.get('/rank_in_file_inprogress',middleware_class.memberOnly,view_controller.EmpInprogress);//get rank in file in progress.
routes.get('/search_employee',middleware_class.memberOnly,search_employee.searchEmployeeList);//get department employee's name
routes.get('/unit_head_returned',middleware_class.memberOnly,view_controller.UnitHeadReturned);//get unit head for assigning
routes.get('/total_assigned',middleware_class.memberOnly,counter_employee.TotalTicketsAssigned);//get total assigned
routes.get('/total_closed',middleware_class.memberOnly,counter_employee.TotalTicketsClosed);//get total closed
routes.get('/get_records',middleware_class.memberOnly,counter_employee.allReports);//get total average rating
routes.get('/get_counter',middleware_class.memberOnly,counter_employee.countEmpDashboard);//employee dashboard
routes.get('/get_unitheaddash',middleware_class.memberOnly,counter_depttask.countUnitTask);//unit head dept task
routes.get('/get_unittask',middleware_class.memberOnly,counter_unithead.countMyDash); //unit head dashboard
routes.get('/get_unitcount',middleware_class.memberOnly,count_pending.countUnitDashboard); //admin dashboard
routes.get('/get_admincount',middleware_class.memberOnly,counter_admin.countAdmin); //admin dashboard
routes.get('/get_admin_submitted',middleware_class.memberOnly,view_controller.adminSubmitted); //admin dashboard
routes.get('/get_admininprogress',middleware_class.memberOnly,view_controller.adminInprogress); //admin dashboard
routes.get('/get_adminforreview',middleware_class.memberOnly,view_controller.adminForReview); //admin dashboard
routes.get('/get_admincompleted',middleware_class.memberOnly,view_controller.adminCompleted); //admin dashboard
routes.get('/get_filter_by_date',middleware_class.memberOnly,filter.filter_by_date);
routes.post('/get_dynamic',middleware_class.memberOnly,dynamic.dynamicSearch);
routes.get('/get_emp_list_ongoing',middleware_class.memberOnly,employee_list_ongoing.getEmpListOngoing);
routes.get('/get_ongoing',middleware_class.memberOnly,getongoing.getOngoing);//get resolved tickets
routes.get('/get_subject',middleware_class.memberOnly,subject.viewSubject)//view subject
routes.get('/get_report',middleware_class.memberOnly,report_controller.indiReport)//view subject
routes.get('/unit_head_misrouted',middleware_class.memberOnly,view_controller.UnitHeadMisrouted); //admin dashboard



//POST
routes.post('/create_ticket', middleware_class.memberOnly,ticket_controller.create_tickets);//create ticket
routes.post('/assign_ticket',middleware_class.memberOnly,assigned_ticket.assignTicket)//create ticket
routes.post('/edit_ticket',middleware_class.memberOnly,ticket_controller.edit_ticket)//edit ticket
routes.post('/add_user', middleware_class.memberOnly, auth_user.addUser);//add user
routes.post('/add_dept',middleware_class.memberOnly,dept_controller.create_dept);//add major dept
routes.post('/archive_dept',middleware_class.memberOnly,dept_controller.sendtoArchive);//send to archive a department
routes.post('/add_role',middleware_class.memberOnly,roles_controller.addRoles);//add usertypes
routes.post('/change_password',middleware_class.memberOnly,auth_user.changePassword);//change password
routes.post('/rate_ticket',middleware_class.memberOnly,rate_controller.rate_tickets);//rate a ticket
routes.post('/ticket_completed',middleware_class.memberOnly,complete_controller.completeTicket);//set as done
routes.post('/back_up_db',middleware_class.memberOnly,backuprestore.dbbackup);//backup db
routes.post('/restore_db',middleware_class.memberOnly,backuprestore.dbrestore);//restore db
routes.post('/returned',middleware_class.memberOnly,return_controller.returnTicket);//return misrouted ticket
routes.post('/re_assign',middleware_class.memberOnly,return_controller.reAssign);//re-assign misrouted ticket
routes.post('/mark_pending', middleware_class.memberOnly,roadblock.markPending);//Mark as roadblock
routes.post('/save_subject',subject.addSubject);
routes.post('/set_archive',auth_user.setArchive)
routes.post('/set_active',auth_user.setActive)
routes.post('/get_view_emp_status',middleware_class.memberOnly,view_dept_list.view_Dept_List)


//-----------------------------------------------------------//

routes.get('/', front_auth_controller.index);

module.exports = routes;


