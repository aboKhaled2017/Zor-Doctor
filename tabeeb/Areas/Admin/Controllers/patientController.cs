using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using tabeeb.Models;
namespace tabeeb.Areas.Admin.Controllers
{
    public class patientController : mainController
    {
        private static int numOfPtRequested = 0;
       // GET: Home
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            db.Configuration.ProxyCreationEnabled = false;
        }
        //
        // GET: /Admin/doctor/
        public ActionResult patient(string getPt="")
        {
            int num = 0;
            try
            {
                num = int.Parse(getPt);
            }
            catch (Exception) { num = 0; }
            if (num > 0) numOfPtRequested = num;
            else numOfPtRequested = 0;
            ViewBag.controller = "patient";
            return View();
        }
        public JsonResult List(int pageNumber=1)
        {           
            var data = db.patients.OrderBy(p=>p.dateOfJoin).Skip((pageNumber-1)*10).Take(pageSize).ToList();
            bool isLastPage = db.patients.Count() <= pageNumber * pageSize;
            return Json(new { data = data, isLastPage = isLastPage }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            try
            {
                db.patients.Remove(db.patients.Find(ID));
                db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }
	}
}