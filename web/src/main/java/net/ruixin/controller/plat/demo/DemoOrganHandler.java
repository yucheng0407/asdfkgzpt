package net.ruixin.controller.plat.demo;


import net.ruixin.controller.BaseController;
import net.ruixin.domain.plat.demo.DemoOrgan;
import net.ruixin.service.plat.demo.IDemoOrganService;
import net.ruixin.util.data.AjaxReturn;
import net.ruixin.util.resolver.FormModel;
import net.ruixin.util.resolver.SearchModel;
import net.ruixin.util.tools.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLDecoder;
import java.util.Map;

/**
 * @author pitcher
 * @date 2017/5/18
 */
@Controller
@RequestMapping("/demoOrgan")
@SuppressWarnings("unchecked")
public class DemoOrganHandler extends BaseController {
    @Autowired
    private IDemoOrganService demoOrganService;

    @ResponseBody
    @RequestMapping(value = "/getDemoOrganList")
    public AjaxReturn getDemoOrganList(@SearchModel Object map) {
        return new AjaxReturn().setSuccess(true).setData(demoOrganService.getDemoOrganList((Map) map));
    }


    @ResponseBody
    @RequestMapping(value = "/getDemoOrganById")
    public AjaxReturn getDemoOrganById(Long id) {
        return new AjaxReturn().setSuccess(true).setData(demoOrganService.get(DemoOrgan.class, id));
    }

    //
    @ResponseBody
    @RequestMapping(value = "/saveDemoOrgan")
    public AjaxReturn saveDemoOrgan(@FormModel DemoOrgan demoOrgan) {
        demoOrganService.saveDemoOrgan(demoOrgan);
        return new AjaxReturn().setSuccess(true).setData(demoOrgan.getId());
    }

    @ResponseBody
    @RequestMapping(value = "/deleteDemoOrgan")
    public AjaxReturn deleteDemoOrgan(Long id) {
        demoOrganService.delete(DemoOrgan.class, id);
        return new AjaxReturn().setSuccess(true);
    }

    /**
     * 模板的导入
     *
     * @param file
     * @return
     * @throws IOException
     */
    @ResponseBody
    @RequestMapping(value = "/excelOrgan")
    public AjaxReturn excelOrgan(MultipartFile file) throws IOException {
        String[] field = {"XH", "NAME", "SEX", "CSRQ", "ORGAN", "DESCRIPTION"};
        demoOrganService.excelOrgan(file, field);
        return new AjaxReturn().setSuccess(true);
    }


    /**
     * excel模板的下载
     *
     * @param filename 文件名称
     * @param request
     * @param response
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping("/exportTemplate")
    public void exportTemplate(String filename, HttpServletRequest request, HttpServletResponse response) throws Exception {
        filename = URLDecoder.decode(filename, "utf-8");
        response.reset();
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes("gb2312"), "ISO8859-1"));
        InputStream is = null;
        OutputStream os = null;
        try {
            String filePath = request.getServletContext().getRealPath("/medias/template/" + filename);
            is = new FileInputStream(filePath);
            os = new BufferedOutputStream(response.getOutputStream());
            byte[] b = new byte[1024];
            int len;
            while ((len = is.read(b)) > 0) {
                os.write(b, 0, len);
            }
        } finally {
            IOUtils.close(is, os);
        }
    }


}
