package net.ruixin.controller.qzld;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/bqgl")
public class BqglMapping {

    /**
     * 备勤管理列表
     */
    @RequestMapping(value = "/bqglList")
    public String bqglList() {
        return "qzld/bqgl/bqglList";
    }


    /***
     *备勤管理新增
     * */
    @RequestMapping(value = "/bqglAdd")
    public String bqglAdd() {
        return "qzld/bqgl/bqglEdit";
    }
    /***
     * 机构树
     * */
    @RequestMapping(value ="/getOrganTree")
    public  String getOrganTree(){
        return "plat/tree/organTreeSync";
    }

    /**
     * 责任单位用户
     * **/
    @RequestMapping(value ="/getUserTeamTree")
    public  String getUserTeamTree(){
        return "plat/tree/userTree";
    }

    /**
     * 引用历史记录
     * */
    @RequestMapping(value ="/getYyls")
    public  String getYyls(){
        return "qzld/bqgl/yylsList";
    }
   /**
    * 修改
    * */
   @RequestMapping(value = "/bqglEdit")
    public String bqglEdit(){
       return "/qzld/bqgl/bqglEdit";
   }

   /**
    * 查看
    * */
   @RequestMapping(value = "/bqglView")
   public String bqglView(){
       return "/qzld/bqgl/bqglView";
   }
}
