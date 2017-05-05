using System.Linq;

namespace Langben.DAL
{
    public abstract class BaseViewRepository<T> where T : class
    {
        #region 字段

        /// <summary>
        /// 开始时间的标识
        /// </summary>
        public string Start_Time { get { return "Start_Time"; } }
        /// <summary>
        /// 结束时间的标识
        /// </summary>
        public string End_Time { get { return "End_Time"; } }
        /// <summary>
        /// 开始数值的标识
        /// </summary>
        public string Start_Int { get { return "Start_Int"; } }
        /// <summary>
        /// 结束数值的标识
        /// </summary>
        public string End_Int { get { return "End_Int"; } }
        ///
        /// 精确字符串
        /// </summary>
        public string DDL_String { get { return "DDL_String"; } }
        /// <summary>
        /// 精确数字
        /// </summary>
        public string DDL_Int { get { return "DDL_Int"; } }

        #endregion
        
        /// <summary>
        /// 获取所有
        /// </summary>
        /// <returns>集合</returns>
        public virtual IQueryable<T> GetAll(SysEntities db)
        {
            return db.Set<T>().AsQueryable();
        }

    }
}

