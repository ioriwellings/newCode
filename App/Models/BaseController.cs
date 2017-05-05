using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Common;
using System.Web.Mvc;
using System.Text;
using System.EnterpriseServices;
using System.Configuration;

 
using System.Web;

namespace Langben.App.Models
{
    //[SupportFilter]//此处如果去掉注释，则全部继承BaseController的Controller，都将执行SupportFilter过滤
    public class BaseController : Controller
    {
        /// <summary>
        /// 获取当前登陆人的用户名
        /// </summary>
        /// <returns></returns>
        public string GetCurrentPerson()
        {
            return AccountModel.GetCurrentPerson();


        }
        /// <summary>
        /// 获取当前登陆人的账户信息
        /// </summary>
        /// <returns>账户信息</returns>
        public Account GetCurrentAccount()
        {
            var account = AccountModel.GetCurrentAccount();

            return account;


        }
       
        public BaseController()
        { }

    }
}
