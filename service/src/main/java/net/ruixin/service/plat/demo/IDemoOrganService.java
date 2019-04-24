package net.ruixin.service.plat.demo;


import net.ruixin.domain.plat.demo.DemoOrgan;
import net.ruixin.service.plat.common.IBaseService;
import net.ruixin.util.paginate.FastPagination;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by pitcher on 2017/5/18.
 */

public interface IDemoOrganService extends IBaseService {
    FastPagination getDemoOrganList(Map map);

    void saveDemoOrgan(DemoOrgan demoOrgan);

    /**
     *  excel的导入
     * @param filePath 文件路径
     * @param fields 导入的字段
     * @return
     * @throws IOException
     */
    List<Map<String, Object>> excelOrgan(MultipartFile filePath, String[] fields) throws IOException;
}
