package net.ruixin.util.mapUtil;

import net.ruixin.util.json.JacksonUtil;
import net.ruixin.util.tools.RxStringUtils;
import oracle.spatial.geometry.JGeometry;
import oracle.sql.STRUCT;
import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate4.SessionFactoryUtils;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by rxnew on 2018/1/10.
 */
public class MapUtil {

    /**
     * 图元类型数组
     */
    private static int[] polygonType = new int[]{JGeometry.GTYPE_POLYGON, JGeometry.GTYPE_MULTIPOLYGON};

    private static int[] polylineType = new int[]{JGeometry.GTYPE_CURVE, JGeometry.GTYPE_MULTICURVE};

    private static int[] pointType = new int[]{JGeometry.GTYPE_POINT};

    /**
     * Double[]转double[]
     *
     * @param doubles
     * @return
     */
    public static double[] toDoubleArray(Double[] doubles) {
        double[] array = new double[doubles.length];
        for (int i = 0; i < doubles.length; i++) {
            array[i] = doubles[i];
        }
        return array;
    }

    /**
     * SessionFactory得到数据库原始Connection
     */
    private static Connection getConnection(SessionFactory sessionFactory) throws Exception {
        Connection connection = SessionFactoryUtils.getDataSource(sessionFactory).getConnection();
        Connection oracleConnection = connection.getMetaData().getConnection();
        connection.close();
        return oracleConnection;
    }

    /**
     * SessionFactory得到数据库原始Connection
     */
    public static JGeometry getJGeometry(Map arcgis) throws Exception {
        //arcgis转JGeometry
        JGeometry geometry = null;
        if (arcgis == null) return geometry;
        Map wkid = (Map) arcgis.get("spatialReference");
        int sid = Integer.parseInt(wkid.get("wkid").toString());
        switch ((String) arcgis.get("type")) {
            case "polygon": {
                geometry = JGeometry.createLinearPolygon(parseArcgis(arcgis, "rings"), 2, sid);
                break;
            }
            case "point": {
                geometry = new JGeometry(Double.parseDouble(arcgis.get("x").toString()), Double.parseDouble(arcgis.get("y").toString()), sid);
                break;
            }
            case "polyline": {
                geometry = JGeometry.createLinearLineString(parseArcgis(arcgis, "paths"), 2, sid);
                break;
            }
            default:
                break;
        }
        return geometry;
    }

    private static double[] parseArcgis(Map domain, String type) {
        List<List<Double>> list = (List) (((List) domain.get(type)).get(0));
        List endList = list.get(list.size() - 1);
        List endList1 = list.get(list.size() - 2);
        if (endList.get(0).equals(endList1.get(0)) && endList.get(1).equals(endList1.get(1))) {
            list.remove(list.size() - 1);
        }
        List sublist = new ArrayList();
        for (List _list : list) {
            sublist.addAll(_list);
        }
        double[] array = MapUtil.toDoubleArray((Double[]) sublist.toArray(new Double[sublist.size()]));
        return array;
    }

    /**
     * JGeometry转STRUCT
     */
    public static STRUCT toSTRUCT(JGeometry geometry, SessionFactory sessionFactory) {//转为STRUCT
        Connection connection = null;//得到原始数据链接
        try {
            connection = getConnection(sessionFactory);
            return JGeometry.store(geometry, connection);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 坐标转JGeometry
     */
    public static JGeometry toGeometry(Double x, Double y) {//转为STRUCT
        return new JGeometry(x, y, 4326);
    }

    public static Object handleGeometry(Double x, Double y) throws SQLException {
        return "{\"x\":" + x + ", \"y\": " + y + ", \"spatialReference\": {\"wkid\": 4326 },\"type\":\"point\" }";
    }




    /**
     * 处理空间对象数据（STRUCT）
     * 转化geoJson以支持前端Arcgis
     *
     * @param result
     * @return
     * @throws SQLException
     */
    public static Object handleGeometryCenter(Object result) throws SQLException {
        if (result != null && (result.getClass().getName().equals(STRUCT.class.getName()) || result.getClass().getName().equals(JGeometryType.class.getName()) || result.getClass().getName().equals(JGeometry.class.getName()))) {
            JGeometry geom = null;
            if (result.getClass().getName().equals(STRUCT.class.getName())) {
                geom = JGeometry.load((STRUCT) result);
            } else if (result.getClass().getName().equals(JGeometryType.class.getName())) {
                geom = ((JGeometryType) result).getJGeometry();
            } else {
                geom = (JGeometry) result;
            }
            String argisGeo = "";
            if (null != geom) {
                double[] mbr = geom.getMBR();
                argisGeo = "{\"x\":" +  ((mbr[0] + mbr[2]) / 2)+ ", \"y\": " +  ( (mbr[1] + mbr[3]) / 2) + ", \"spatialReference\": {\"wkid\": 4326 },\"type\":\"point\" }";
            }
            return argisGeo;
        } else {
            return result;
        }
    }


    public static Object handleGeometryCenter2(Object result) throws SQLException {
        if (result != null && (result.getClass().getName().equals(STRUCT.class.getName()) || result.getClass().getName().equals(JGeometryType.class.getName()) || result.getClass().getName().equals(JGeometry.class.getName()))) {
            JGeometry geom = null;
            if (result.getClass().getName().equals(STRUCT.class.getName())) {
                geom = JGeometry.load((STRUCT) result);
            } else if (result.getClass().getName().equals(JGeometryType.class.getName())) {
                geom = ((JGeometryType) result).getJGeometry();
            } else {
                geom = (JGeometry) result;
            }
            String argisGeo = "";
            if (null != geom) {
                double[] mbr = geom.getMBR();
                argisGeo = "{\"x\":" +  ((mbr[0] + mbr[2]) / 2)+ ", \"y\": " +  ( (mbr[1] + mbr[3]) / 2) + ", \"spatialReference\": {\"wkid\": 4326 },\"type\":\"point\" }";
            }
            return argisGeo;
        } else {
            return result;
        }
    }

    public static Object handleGeometryFirst(Object result) throws SQLException {
        if (result != null && (result.getClass().getName().equals(STRUCT.class.getName()) || result.getClass().getName().equals(JGeometryType.class.getName()) || result.getClass().getName().equals(JGeometry.class.getName()))) {
            JGeometry geom = null;
            if (result.getClass().getName().equals(STRUCT.class.getName())) {
                geom = JGeometry.load((STRUCT) result);
            } else if (result.getClass().getName().equals(JGeometryType.class.getName())) {
                geom = ((JGeometryType) result).getJGeometry();
            } else {
                geom = (JGeometry) result;
            }
            String argisGeo = "";
            if (null != geom) {
                Object[] ordinates = geom.getOrdinatesOfElements();
                double[] ordinatesArray = (double[]) ordinates[0];
                argisGeo = "{\"x\":" + ordinatesArray[0] + ", \"y\": " + ordinatesArray[1] + ", \"spatialReference\": {\"wkid\": 4326 },\"type\":\"point\" }";
            }
            return argisGeo;
        } else {
            return result;
        }
    }


    /**
     * 处理空间对象数据（STRUCT）
     * 转化geoJson以支持前端Arcgis
     *
     * @param result
     * @return
     * @throws SQLException
     */
    public static Object handleGeometry(Object result) throws SQLException {
        if (result != null && (result.getClass().getName().equals(STRUCT.class.getName()) || result.getClass().getName().equals(JGeometryType.class.getName()) || result.getClass().getName().equals(JGeometry.class.getName()))) {
            JGeometry geom = null;
            if (result.getClass().getName().equals(STRUCT.class.getName())) {
                geom = JGeometry.load((STRUCT) result);
            } else if (result.getClass().getName().equals(JGeometryType.class.getName())) {
                geom = ((JGeometryType) result).getJGeometry();
            } else {
                geom = (JGeometry) result;
            }
            String argisGeo = "";
            if (null != geom) {
                int type = geom.getType();
                //面
                if (type == polygonType[0] || type == polygonType[1]) {
                    List list = new ArrayList();
                    //考虑存在复合多边形图元的存在，将每一块图元分组
                    Object[] ordinatesOfElements = geom.getOrdinatesOfElements();
                    for (Object o : ordinatesOfElements) {
                        List element = new ArrayList();
                        //每一块图形的点序列
                        double[] ordinatesArray = (double[]) o;
                        for (int i = 0; i < ordinatesArray.length - 1; i += 2) {
                            List<Double> ordinate = new ArrayList();
                            ordinate.add(ordinatesArray[i]);
                            ordinate.add(ordinatesArray[i + 1]);
                            element.add(ordinate);
                        }
                        list.add(element);
                    }
                    String ring = JacksonUtil.toJson(list);
                    argisGeo = "{\"rings\":" + ring + ",\"spatialReference\":{\"wkid\":4326 },\"type\":\"polygon\"}";
                } else if (type == polylineType[0] || type == polylineType[1]) {//线
                    List list = new ArrayList();
                    //考虑存在复合多边形图元的存在，将每一块图元分组
                    Object[] ordinatesOfElements = geom.getOrdinatesOfElements();
                    for (Object o : ordinatesOfElements) {
                        List element = new ArrayList();
                        //每一块图形的点序列
                        double[] ordinatesArray = (double[]) o;
                        for (int i = 0; i < ordinatesArray.length - 1; i += 2) {
                            List<Double> ordinate = new ArrayList();
                            ordinate.add(ordinatesArray[i]);
                            ordinate.add(ordinatesArray[i + 1]);
                            element.add(ordinate);
                        }
                        list.add(element);
                    }
                    String paths = JacksonUtil.toJson(list);
                    argisGeo = "{\"paths\":" + paths + ",\"spatialReference\":{\"wkid\":4326 },\"type\":\"polyline\"}";
                } else if (type == pointType[0]) {//点
                    argisGeo = "{\"x\":" + geom.getPoint()[0] + ", \"y\": " + geom.getPoint()[1] + ", \"spatialReference\": {\"wkid\": 4326 },\"type\":\"point\" }";
                }
            }
            return argisGeo;
        } else {
            return result;
        }
    }

    /**
     * 获取空间对象类型
     * 无空间对象时返回0
     *
     * @param result
     * @return
     * @throws SQLException
     */
    public static int handleGeometryType(Object result) throws SQLException {
        if (result != null && result.getClass().getName().equals(STRUCT.class.getName())) {
            JGeometry geom = JGeometry.load((STRUCT) result);
            if (null != geom) {
                return geom.getType();
            }
        }
        return 0;
    }

    /**
     * 处理List<Map>内缺少所需空间上图对象
     * 规定Map 内必须含有表示经度的key:X和表示纬度的key:Y
     *
     * @param list
     * @return
     */
    public static List handleShowGeometryList(List<Map> list) {
        for (Map m : list) {
            try {
                if (RxStringUtils.isNotEmpty(m.get("X")) && RxStringUtils.isNotEmpty(m.get("Y"))) {
                    m.put("SHOW_GEOMETRY", MapUtil.handleGeometry(Double.parseDouble(m.get("X").toString()), Double.parseDouble(m.get("Y").toString())));
                } else {
                    m.put("SHOW_GEOMETRY", null);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return list;
    }

    /**
     * 将ORACLE STRUCT 空间对象数据转换为Arcgis需要的数据格式
     *
     * @param list
     * @return
     */
    public static List handleGeometryToArcgis(List<Map> list) {
        for (Map map : list) {
            try {
                if (RxStringUtils.isNotEmpty(map.get("SHOW_GEOMETRY"))) {
                    map.put("SHOW_CENTER", MapUtil.handleGeometryCenter2(map.get("SHOW_GEOMETRY")));
                } else {
                    map.put("SHOW_CENTER", null);
                }
                if (RxStringUtils.isNotEmpty(map.get("SHOW_GEOMETRY"))) {
                    map.put("SHOW_GEOMETRY", MapUtil.handleGeometry(map.get("SHOW_GEOMETRY")));
                } else {
                    map.put("SHOW_GEOMETRY", null);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return list;
    }
    /**
     * 将ORACLE STRUCT 空间对象数据转换为Arcgis需要的数据格式
     *
     * @param list
     * @return
     */
    public static List handleGeometryCenterToArcgis(List<Map> list) {
        for (Map map : list) {
            try {
                if (RxStringUtils.isNotEmpty(map.get("SHOW_GEOMETRY"))) {
                    map.put("SHOW_GEOMETRY", MapUtil.handleGeometryCenter(map.get("SHOW_GEOMETRY")));
                } else {
                    map.put("SHOW_GEOMETRY", null);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return list;
    }
}
//    /**
//     * 处理空间对象数据
//     *
//     * @param result
//     * @return
//     * @throws SQLException
//     */
//    public static List<Map<String, Object>> handleGeometry(List result) throws SQLException {
//        List geoList = new ArrayList();
//        for (Map<String, Object> map : (List<Map<String, Object>>) result) {
//            //解析空间字段
//            Iterator<Map.Entry<String, Object>> entries = map.entrySet().iterator();
//            Map resultMap = new HashMap();
//            while (entries.hasNext()) {
//                Map.Entry<String, Object> entry = entries.next();
//                if (entry.getValue() != null && entry.getValue().getClass().getName().equals(STRUCT.class.getName())) {
//                    JGeometry geom = JGeometry.load((STRUCT) entry.getValue());
//                    if (null != geom) {
//                        int type = geom.getType();
//                        if (type == polygonType[0] || type == polygonType[1]) {
//                            resultMap.put("GTYPE", "polygon");
//                        } else if (type == polylineType[0] || type == polylineType[1]) {
//                            resultMap.put("GTYPE", "polyline");
//                        } else if (type == pointType[0]) {
//                           // resultMap.put("GTYPE", "point");
//                            resultMap.put(entry.getKey(), "{'x': -122.65, 'y': 45.53, 'spatialReference': {'wkid': 4326 } }");
//                           // resultMap.put("X",geom.getPoint()[0]);
//                           // resultMap.put("Y",geom.getPoint()[1]);
//                        }
//                    }
//                }else{
//                    resultMap.put(entry.getKey(),entry.getValue());
//                }
//            }
//            geoList.add(resultMap);
//        }
//        return geoList;
//    }
//}
