using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Langben.DAL;
using Langben.IBLL;
namespace Langben.BLL
{
    public class HomeBLL : IHomeBLL, IDisposable
    {
        //
        public string firstMenu = @"
  <li id='liRecruit'>
                        <a href='javascript:void(0);'>
                            <span class='{0}'>
                                <span class='path1'></span><span class='path2'></span>
                            </span>
                            <span class='title'>{1}</span> <span class='selected'></span> <span class='arrow'></span>
                        </a>
                        <ul id='ulRecruit' class='sub-menu'>^</ul></li>
";
        public string sanMenu = @"<li><a href='javascript:void(0);' page=@{0}@ id=@{1}@>{2}</a></li>^";

        /// <summary>
        /// 根据PersonId 获取已经启用的菜单
        /// </summary>
        /// <param name="personId">人员的Id</param>
        /// <returns>菜单拼接的字符串</returns>
        public string GetMenuByAccount(ref Common.Account person)
        {
            using (SysEntities db = new SysEntities())
            {
                string personId = person.Id;
                var roleIds =
                           (//该用户的所有角色
                           from r in db.SysRole
                           from p in r.SysPerson
                           where p.Id == personId
                           select r.Id
                           ).ToList();
                person.RoleIds = roleIds;

                List<SysMenu> menuNeed =
                            (//该用户的角色下的菜单
                            from m2 in db.SysMenu
                            from f in m2.SysMenuSysRoleSysOperation

                            where roleIds.Any(a => a == f.SysRoleId) && f.SysOperationId == null
                            select m2
                            ).Distinct().OrderBy(o => o.Remark).ToList();//此方法由临海人(qq:1012999282)提供
                //person.MenuIds = menuNeed.Where(w => w.IsLeaf == null).Select(s => s.Url).ToList();

                StringBuilder strmenu2 = new StringBuilder();//拼接菜单的字符串
                int lever = 0;//上一个菜单的层级
                int current = 0;//当前菜单的层级
                //在1.2版本中修改
                if (menuNeed.Count > 1)
                {
                    for (int i = 0; i < menuNeed.Count; i++)
                    {
                        current = menuNeed[i].Remark.Length / 4;//按照4位数字的编码格式

                        if (current == 1)//加载根目录的菜单                       
                        {
                            //解决ie6下没有滚动条的问题
                            strmenu2.Replace('^', ' ')
                                .Append(string.Format(firstMenu, menuNeed[i].Iconic, menuNeed[i].Name));
                        }
                        else if (current < lever)//进入上一个菜单层级
                        {
                            string replace = string.Empty;
                            for (int c = 0; c < lever - current; c++)//减少了几个层级
                            {
                                replace += ("</ul></li>");
                            }
                            if ((i == menuNeed.Count - 1) || (menuNeed[i].Remark.Length >= menuNeed[i + 1].Remark.Length))
                                strmenu2.Replace("^" + replace, replace + GetNode(menuNeed[i], true));
                            else
                                strmenu2.Replace("^" + replace, replace + GetNode(menuNeed[i], false));
                        }
                        else//进入本级菜单或者下一个菜单
                        {
//最后一个，或者下一个长度不小于这个的长度
                            if ((i == menuNeed.Count - 1) || (menuNeed[i].Remark.Length >= menuNeed[i + 1].Remark.Length))
                            { 
                                strmenu2.Replace("^", GetNode(menuNeed[i], true));
                           } else
                                strmenu2.Replace("^", GetNode(menuNeed[i], false));

                        }
                        lever = current;
                    }
                }
                return strmenu2.ToString().Replace('@', '"').Replace('^', ' ');
            }
        }
        /// <summary>
        /// 获取节点的字符串
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public string GetNode(SysMenu item, bool isLeaf = false)
        {
         
            if (isLeaf)
            {
                return string.Format(sanMenu,
                   item.Url, item.Id, item.Name);

            }
            else
            {
                if (string.IsNullOrWhiteSpace(item.Iconic))
                {
                    return string.Format(firstMenu, string.Empty, item.Name);//没有图标
                }
                else
                {
                    return string.Format(firstMenu, item.Iconic, item.Name);//没有图标
                }
            }
        }

        public void Dispose()
        {

        }
    }
}

