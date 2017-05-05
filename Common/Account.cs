using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;

namespace Common
{
    /// <summary>
    /// 登录的用户信息
    /// </summary>
   
    [Serializable]
    public class Account
    {
        /// <summary>
        /// 主键
        /// </summary>
      
        public string Id { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
     
        public string Name { get; set; }
        /// <summary>
        /// 登录的用户名
        /// </summary>
   
        public string PersonName { get; set; }
        /// <summary>
        /// 登录总次数
        /// </summary>
      
        public int? LogonNum { get; set; }
        /// <summary>
        /// 上次登录的时间
        /// </summary>
     
        public DateTime? LastLogonTime { get; set; }
        /// <summary>
        /// 上次登录IP
        /// </summary>
       
        public string LastLogonIP { get; set; }
        
        /// <summary>
        /// 角色的集合
        /// </summary>
     
        public List<string> RoleIds { get; set; }

        /// <summary>
        /// 菜单的集合
        /// </summary>
     
        public List<string> MenuIds { get; set; }
        /// <summary>
        /// 皮肤
        /// </summary>
     
        public string Theme { get; set; }
    }
}
