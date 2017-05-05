using System;
namespace Langben.IBLL
{
    public interface IAccountBLL
    {
        bool ChangePassword(string personName, string oldPassword, string newPassword);
        /// <summary>
        /// 验证用户是否存在，如果存在就返回人员信息
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Langben.DAL.SysPerson ValidateUser(string userName, string password);
    }
}
