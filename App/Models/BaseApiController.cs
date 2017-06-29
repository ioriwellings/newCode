using System.Web.Http;
using Common;
namespace Langben.App.Models
{
    public class BaseApiController : ApiController
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
        public class GetDataParam
        {
            public string sort { get; set; }
            public string order { get; set; }
            public int page { get; set; }
            public int rows { get; set; }
            public string id { get; set; }
            public string search { get; set; }
        }
        public class ExportParam
        {
            public string id { get; set; }
            public string title { get; set; }
            public string field { get; set; }
            public string sortName { get; set; }
            public string sortOrder { get; set; }
            public string search { get; set; }

        }

       
    }
}
