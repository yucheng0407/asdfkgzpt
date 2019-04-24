package net.ruixin.util.workflow.draw.activiti;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.Point2D.Double;
import java.awt.image.BufferedImage;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import net.ruixin.util.tools.Dom4jUtil;
import net.ruixin.util.tools.ObjectUtils;
import net.ruixin.util.workflow.constant.ServiceTaskType;
import net.ruixin.util.workflow.draw.bpmn.*;
import net.ruixin.util.workflow.draw.entity.FlowImageStyle;
import net.ruixin.util.workflow.draw.entity.ImageType;
import net.ruixin.util.workflow.draw.util.ElementUtil;
import net.ruixin.util.workflow.draw.util.MathUtil;
import org.dom4j.Document;
import org.dom4j.Element;

public class ProcessDiagramGenerator {
    protected static final Map<BPMNShapType, GraphDrawInstruction> graphDrawInstructions = new HashMap();
    //缩放比例
    protected static final int SCALING = 2;
    //通用字体
    protected static final Font GENERAL_FONT = new Font("微软雅黑", Font.BOLD, 13 * ProcessDiagramGenerator.SCALING);

    static {
        graphDrawInstructions.put(BPMNShapType.START_EVENT, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawNoneStartEvent(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.ERROR_EVENT, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawErrorEndEvent(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.END_EVENT, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawNoneEndEvent(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.CANCEL_EVENT, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawErrorEndEvent(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.TASK, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawTask(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.USER_TASK, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawUserTask(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.SCRIPT_TASK, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawScriptTask(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.SERVICE_TASK, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawServiceTask(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.RECEIVE_TASK, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawReceiveTask(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.SEND_TASK, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawSendTask(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.MANUAL_TASK, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawManualTask(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.EXCLUSIVE_GATEWAY, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawExclusiveGateway(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.INCLUSIVE_GATEWAY, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawInclusiveGateway(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.PARALLEL_GATEWAY, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawParallelGateway(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.SUB_PROCESS, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                if (shap.isExpanded() != null && !shap.isExpanded()) {
                    processDiagramCanvas.drawCollapsedSubProcess(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
                } else {
                    processDiagramCanvas.drawExpandedSubProcess(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
                }

            }
        });
        graphDrawInstructions.put(BPMNShapType.CALL_ACTIVITY, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawCollapsedCallActivity(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.H_POOL, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawHPool(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.H_LANE, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawHLane(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.V_POOL, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawVPool(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.V_LANE, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawVLane(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
        graphDrawInstructions.put(BPMNShapType.TEXT_ANNOTATION, new GraphDrawInstruction() {
            @Override
            public void draw(ProcessDiagramCanvas processDiagramCanvas, BPMNShap shap) {
                processDiagramCanvas.drawTextAnnotation(shap.getName(), MathUtil.round(shap.getX()) * SCALING, MathUtil.round(shap.getY()) * SCALING, MathUtil.round(shap.getWidth()) * SCALING, MathUtil.round(shap.getHeight()) * SCALING);
            }
        });
    }

    public ProcessDiagramGenerator() {
    }

    public static InputStream generatePngDiagram(String bpmnXml, Map<String, FlowImageStyle> imageStyle) {
        return generateDiagram(bpmnXml, imageStyle, ImageType.PNG);
    }

    public static InputStream generateDiagram(String bpmnXml, Map<String, FlowImageStyle> imageStyle, ImageType imageType) {
        return generateDiagram(bpmnXml, imageStyle).generateImage(imageType);
    }

    public static ProcessDiagramCanvas generateDiagram(String bpmnXml, Map<String, FlowImageStyle> imageStyle) {
        List<BPMNShap> bpmnShaps = extractBPMNShap(bpmnXml);
        List<BPMNEdge> bpmnEdges = extractBPMNEdge(bpmnXml);
        ProcessDiagramCanvas processDiagramCanvas = initProcessDiagramCanvas(bpmnShaps, bpmnEdges);
        Iterator iterator = bpmnShaps.iterator();

        while (iterator.hasNext()) {
            BPMNShap bpmnShap = (BPMNShap) iterator.next();
            drawActivity(processDiagramCanvas, imageStyle, bpmnShap);
        }

        drawSequenceFlows(processDiagramCanvas, bpmnEdges);
        return processDiagramCanvas;
    }

    public static void drawActivity(ProcessDiagramCanvas processDiagramCanvas, Map<String, FlowImageStyle> imageStyle, BPMNShap bpmnShap) {
        GraphDrawInstruction drawInstruction = graphDrawInstructions.get(bpmnShap.getType());
        if (!ObjectUtils.isEmpty(drawInstruction)) {
            drawInstruction.draw(processDiagramCanvas, bpmnShap);
            boolean multiInstanceSequential = false;
            boolean multiInstanceParallel = false;
            boolean collapsed = false;
            Properties properties = bpmnShap.getProperties();
            String isSequential = properties != null ? (String) properties.get("isSequential") : null;
            if (isSequential != null) {
                if ("true".equals(isSequential)) {
                    multiInstanceSequential = true;
                } else {
                    multiInstanceParallel = true;
                }
            }

            collapsed = bpmnShap.isExpanded() != null ? !bpmnShap.isExpanded() : collapsed;
            processDiagramCanvas.drawActivityMarkers(MathUtil.round(bpmnShap.getX()), MathUtil.round(bpmnShap.getY()), MathUtil.round(bpmnShap.getWidth()), MathUtil.round(bpmnShap.getHeight()), multiInstanceSequential, multiInstanceParallel, collapsed);
            if (!ObjectUtils.isEmpty(imageStyle)) {
                String bpmnElement = bpmnShap.getBpmnElement();
                if (imageStyle.containsKey(bpmnElement)) {
                    drawHighLight(processDiagramCanvas, bpmnShap, imageStyle.get(bpmnElement));
                }

            }
        }
    }

    private static void drawHighLight(ProcessDiagramCanvas processDiagramCanvas, BPMNShap bpmnShap, FlowImageStyle flowImageStyle) {
        processDiagramCanvas.drawHighLight(MathUtil.round(bpmnShap.getX()) * SCALING, MathUtil.round(bpmnShap.getY()) * SCALING, MathUtil.round(bpmnShap.getWidth()) * SCALING, MathUtil.round(bpmnShap.getHeight()) * SCALING, flowImageStyle);
    }

    public static void drawSequenceFlows(ProcessDiagramCanvas processDiagramCanvas, List<BPMNEdge> bpmnEdges) {
        Iterator var3 = bpmnEdges.iterator();

        while (var3.hasNext()) {
            BPMNEdge bpmnEdge = (BPMNEdge) var3.next();
            processDiagramCanvas.drawSequenceflowWidthLabel(bpmnEdge);
        }

    }

    public static ProcessDiagramCanvas initProcessDiagramCanvas(List<BPMNShap> shaps, List<BPMNEdge> edges) {
        Double[] points = caculateCanvasSize(shaps, edges);
        double shiftX = points[0].getX() < 0.0D ? points[0].getX() : 0.0D;
        double shiftY = points[0].getY() < 0.0D ? points[0].getY() : 0.0D;
        shiftProcessDefinition(shaps, edges, shiftX, shiftY);
        int width = MathUtil.round(points[1].getX() + 10.0D - shiftX);
        int height = MathUtil.round(points[1].getY() + 10.0D - shiftY);
        int minX = MathUtil.round(points[0].getX() - shiftX);
        int minY = MathUtil.round(points[0].getY() - shiftY);
        return new ProcessDiagramCanvas(width, height, minX, minY);
    }

    public static Double[] caculateCanvasSize(List<BPMNShap> shaps, List<BPMNEdge> edges) {
        double minX = 1.7976931348623157E308D;
        double minY = 1.7976931348623157E308D;
        double maxX = 0.0D;
        double maxY = 0.0D;
        Iterator var11 = shaps.iterator();

        while (var11.hasNext()) {
            BPMNShap shap = (BPMNShap) var11.next();
            if (shap.getX() < minX) {
                minX = shap.getX();
            }

            if (shap.getY() < minY) {
                minY = shap.getY();
            }

            if (shap.getX() + shap.getWidth() > maxX) {
                maxX = shap.getX() + shap.getWidth();
            }

            if (shap.getY() + shap.getHeight() > maxY) {
                maxY = shap.getY() + shap.getHeight();
            }
        }

        var11 = edges.iterator();

        while (var11.hasNext()) {
            BPMNEdge edge = (BPMNEdge) var11.next();
            Iterator var13 = edge.getPoints().iterator();

            while (var13.hasNext()) {
                Double point = (Double) var13.next();
                if (point.getX() < minX) {
                    minX = point.getX();
                }

                if (point.getY() < minY) {
                    minY = point.getY();
                }

                if (point.getX() > maxX) {
                    maxX = point.getX();
                }

                if (point.getY() > maxY) {
                    maxY = point.getY();
                }
            }

            String label = edge.getName() == null ? "" : edge.getName();
            Double midPoint = edge.getMidpoint();
            DirectionType directionType = edge.getDirection();
            FontMetrics fontMetrics = getFontMetrics();
            double labelMinX;
            double labelMinY;
            if (directionType.equals(DirectionType.UP_TO_DOWN)) {
                labelMinX = midPoint.getX() + (fontMetrics.getHeight() / 2d);
                labelMinY = midPoint.getY();
            } else if (directionType.equals(DirectionType.DOWN_TO_UP)) {
                labelMinX = midPoint.getX() - (double) fontMetrics.stringWidth(label) - (fontMetrics.getHeight() / 2d);
                labelMinY = midPoint.getY() - (fontMetrics.getHeight() / 2d) - (double) fontMetrics.getHeight();
            } else if (directionType.equals(DirectionType.LEFT_TO_RIGHT)) {
                labelMinX = midPoint.getX() - (fontMetrics.stringWidth(label) / 2d);
                labelMinY = midPoint.getY();
            } else {
                labelMinX = (fontMetrics.stringWidth(label) / 2d);
                labelMinY = midPoint.getY() + (double) fontMetrics.getHeight() - (double) fontMetrics.getHeight();
            }

            double labelMaxX = labelMinX + (double) fontMetrics.stringWidth(label);
            double labelMaxY = labelMinY + (double) fontMetrics.getHeight();
            if (labelMinX < minX) {
                minX = labelMinX;
            }

            if (labelMinY < minY) {
                minY = labelMinY;
            }

            if (labelMaxX > maxX) {
                maxX = labelMaxX;
            }

            if (labelMaxY > maxY) {
                maxY = labelMaxY;
            }
        }

        return new Double[]{new Double(minX, minY), new Double(maxX, maxY)};
    }

    private static FontMetrics getFontMetrics() {
        BufferedImage processDiagram = new BufferedImage(2 * SCALING, 2 * SCALING, BufferedImage.TYPE_INT_ARGB);
        Graphics2D g = processDiagram.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        g.setPaint(Color.black);
        g.setFont(GENERAL_FONT);
        return g.getFontMetrics();
    }

    private static void shiftProcessDefinition(List<BPMNShap> shaps, List<BPMNEdge> edges, double x, double y) {
        Iterator var7 = shaps.iterator();

        while (var7.hasNext()) {
            BPMNShap shap = (BPMNShap) var7.next();
            shap.setX(shap.getX() - x);
            shap.setY(shap.getY() - y);
        }

        BPMNEdge edge;
        for (var7 = edges.iterator(); var7.hasNext(); edge.getMidpoint().y = edge.getMidpoint().getY() - y) {
            edge = (BPMNEdge) var7.next();

            Double point;
            for (Iterator var9 = edge.getPoints().iterator(); var9.hasNext(); point.y = point.getY() - y) {
                point = (Double) var9.next();
                point.x = point.getX() - x;
            }

            edge.getMidpoint().x = edge.getMidpoint().getX() - x;
        }

    }

    public static List<BPMNShap> extractBPMNShap(String bpmnXml) {
        bpmnXml = bpmnXml.replace("xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\"", "");
        Document doc = Dom4jUtil.loadXml(bpmnXml);
        Element root = doc.getRootElement();
        List<Element> shaps = root.selectNodes("//bpmndi:BPMNShape");
        List<BPMNShap> bpmnShaps = new ArrayList();
        Iterator iterator = shaps.iterator();

        while (iterator.hasNext()) {
            Element shap = (Element) iterator.next();
            BPMNShap bpmnShap = new BPMNShap();
            bpmnShap.setBpmnElement(shap.attributeValue("bpmnElement"));
            bpmnShap.setChoreographyActivityShape(shap.attributeValue("choreographyActivityShape"));
            bpmnShap.setHorizontal(ElementUtil.getBoolean(shap, "isHorizontal"));
            bpmnShap.setExpanded(ElementUtil.getBoolean(shap, "isExpanded"));
            bpmnShap.setMarkerVisible(ElementUtil.getBoolean(shap, "isMarkerVisible"));
            bpmnShap.setMessageVisible(ElementUtil.getBoolean(shap, "isMessageVisible"));
            bpmnShap.setParticipantBandKind(shap.attributeValue("participantBandKind"));
            Element bound = (Element) shap.selectSingleNode(".//dc:Bounds");
            bpmnShap.setX(ElementUtil.getDouble(bound, "x"));
            bpmnShap.setY(ElementUtil.getDouble(bound, "y"));
            bpmnShap.setWidth(ElementUtil.getDouble(bound, "width"));
            bpmnShap.setHeight(ElementUtil.getDouble(bound, "height"));
            Element component = (Element) root.selectSingleNode("//*[@id='" + bpmnShap.getBpmnElement() + "']");
            if (component != null) {
                BPMNShapType type = getBPMNShapType(component);
                bpmnShap.setType(type);
                bpmnShap.setName(component.attributeValue("name"));
                setBPMNShapProperties(component, bpmnShap);
                bpmnShaps.add(bpmnShap);
            }
        }

        return bpmnShaps;
    }

    public static List<BPMNEdge> extractBPMNEdge(String bpmnXml) {
        List<BPMNEdge> bpmnEdges = new ArrayList();
        bpmnXml = bpmnXml.replace("xmlns=\"http://www.omg.org/spec/BPMN/20100524/MODEL\"", "");
        Document doc = Dom4jUtil.loadXml(bpmnXml);
        Element root = doc.getRootElement();
        List<Element> edges = root.selectNodes("//bpmndi:BPMNEdge");
        Iterator var6 = edges.iterator();

        while (var6.hasNext()) {
            Element edge = (Element) var6.next();
            BPMNEdge bpmnEdge = new BPMNEdge();
            List<Double> points = new ArrayList();
            List<Element> waypoints = edge.selectNodes(".//di:waypoint");
            Iterator var11 = waypoints.iterator();

            double x, y;
            while (var11.hasNext()) {
                Element waypoint = (Element) var11.next();
                x = java.lang.Double.parseDouble(waypoint.attributeValue("x"));
                y = java.lang.Double.parseDouble(waypoint.attributeValue("y"));
                Double point = new Double(x, y);
                points.add(point);
            }

            bpmnEdge.setPoints(points);
            String bpmnElement = edge.attributeValue("bpmnElement");
            Element sequenceFlow = (Element) root.selectSingleNode("//sequenceFlow[@id='" + bpmnElement + "']");
            String labelName = "";
            FlowType flowType = FlowType.SEQUENCE_FLOW;
            if (ObjectUtils.isEmpty(sequenceFlow)) {
                Element association = (Element) root.selectSingleNode("//association[@id='" + bpmnElement + "']");
                labelName = association != null ? association.attributeValue("name") : "";
                flowType = FlowType.ASSOCIATION;
            } else {
                labelName = sequenceFlow != null ? sequenceFlow.attributeValue("name") : "";
            }

            bpmnEdge.setName(labelName);
            bpmnEdge.setFlowType(flowType);
            x = 0.0D;
            y = 0.0D;
            List<java.lang.Double> lens = new ArrayList();

            for (int i = 1; i < points.size(); ++i) {
                lens.add(Math.abs(((Double) points.get(i - 1)).getX() - ((Double) points.get(i)).getX()) + Math.abs(((Double) points.get(i - 1)).getY() - ((Double) points.get(i)).getY()));
            }

            double halfLen = 0.0D;

            double accumulativeLen;
            for (Iterator var24 = lens.iterator(); var24.hasNext(); halfLen += accumulativeLen) {
                accumulativeLen = (java.lang.Double) var24.next();
            }

            halfLen /= 2.0D;
            accumulativeLen = 0.0D;

            int i;
            for (i = 0; i < lens.size(); ++i) {
                accumulativeLen += (java.lang.Double) lens.get(i);
                if (accumulativeLen > halfLen) {
                    break;
                }
            }

            DirectionType directionType;
            if (((Double) points.get(i)).getX() == ((Double) points.get(i + 1)).getX()) {
                if (((Double) points.get(i)).getY() < ((Double) points.get(i + 1)).getY()) {
                    y = halfLen - accumulativeLen + ((Double) points.get(i + 1)).getY();
                    directionType = DirectionType.UP_TO_DOWN;
                } else {
                    y = accumulativeLen - halfLen + ((Double) points.get(i + 1)).getY();
                    directionType = DirectionType.DOWN_TO_UP;
                }

                x = ((Double) points.get(i)).getX();
            } else {
                if (((Double) points.get(i)).getX() < ((Double) points.get(i + 1)).getX()) {
                    x = halfLen - accumulativeLen + ((Double) points.get(i + 1)).getX();
                    directionType = DirectionType.LEFT_TO_RIGHT;
                } else {
                    x = accumulativeLen - halfLen + ((Double) points.get(i + 1)).getX();
                    directionType = DirectionType.RIGHT_TO_LEFT;
                }

                y = ((Double) points.get(i)).getY();
            }

            Double midpoint = new Double(x, y);
            bpmnEdge.setMidpoint(midpoint);
            bpmnEdge.setDirection(directionType);
            bpmnEdges.add(bpmnEdge);
        }

        return bpmnEdges;
    }

    private static BPMNShap setBPMNShapProperties(Element component, BPMNShap bpmnShap) {
        BPMNShapType type = bpmnShap.getType();
        Properties properties = bpmnShap.getProperties();
        if (properties == null) {
            properties = new Properties();
        }

        Element errorEventDefinition;
        String errorRef;
        if (type == BPMNShapType.TASK || type == BPMNShapType.SCRIPT_TASK || type == BPMNShapType.SERVICE_TASK || type == BPMNShapType.BUSINESS_RULE_TASK || type == BPMNShapType.MANUAL_TASK || type == BPMNShapType.USER_TASK || type == BPMNShapType.CALL_ACTIVITY || type == BPMNShapType.SUB_PROCESS) {
            errorEventDefinition = (Element) component.selectSingleNode("./multiInstanceLoopCharacteristics");
            if (errorEventDefinition != null) {
                errorRef = errorEventDefinition.attributeValue("isSequential");
                properties.put("isSequential", errorRef);
            }
        }

        if (type == BPMNShapType.ERROR_EVENT) {
            errorEventDefinition = (Element) component.selectSingleNode("errorEventDefinition");
            errorRef = errorEventDefinition.attributeValue("errorRef");
            properties.put("errorRef", errorRef);
        }

        bpmnShap.setProperties(properties);
        return bpmnShap;
    }

    public static BPMNShapType getBPMNShapType(Element component) {
        BPMNShapType retVal = BPMNShapType.UNKNOW_TYPE;
        if (component.getName().equals(BPMNShapType.START_EVENT.getKey())) {
            retVal = BPMNShapType.START_EVENT;
        } else if (component.getName().equals(BPMNShapType.END_EVENT.getKey())) {
            Element errorEventDefinition = (Element) component.selectSingleNode("errorEventDefinition");
            if (errorEventDefinition == null) {
                retVal = BPMNShapType.END_EVENT;
            } else {
                retVal = BPMNShapType.ERROR_EVENT;
            }
        } else if (component.getName().equals(BPMNShapType.EXCLUSIVE_GATEWAY.getKey())) {
            retVal = BPMNShapType.EXCLUSIVE_GATEWAY;
        } else if (component.getName().equals(BPMNShapType.INCLUSIVE_GATEWAY.getKey())) {
            retVal = BPMNShapType.INCLUSIVE_GATEWAY;
        } else if (component.getName().equals(BPMNShapType.PARALLEL_GATEWAY.getKey())) {
            retVal = BPMNShapType.PARALLEL_GATEWAY;
        } else if (component.getName().equals(BPMNShapType.SCRIPT_TASK.getKey())) {
            retVal = BPMNShapType.SCRIPT_TASK;
        } else {
            String id;
            if (component.getName().equals(BPMNShapType.SERVICE_TASK.getKey())) {
                id = ObjectUtils.isNotEmpty(component.attribute("sertype")) ? component.attribute("sertype").getStringValue() : "";
                if (ServiceTaskType.MESSAGE.getKey().equals(id)) {
                    retVal = BPMNShapType.RECEIVE_TASK;
                } else if (ServiceTaskType.SCRIPT.getKey().equals(id)) {
                    retVal = BPMNShapType.SCRIPT_TASK;
                } else {
                    retVal = BPMNShapType.SERVICE_TASK;
                }
            } else if (component.getName().equals(BPMNShapType.BUSINESS_RULE_TASK.getKey())) {
                retVal = BPMNShapType.BUSINESS_RULE_TASK;
            } else if (component.getName().equals(BPMNShapType.TASK.getKey())) {
                retVal = BPMNShapType.TASK;
            } else if (component.getName().equals(BPMNShapType.MANUAL_TASK.getKey())) {
                retVal = BPMNShapType.MANUAL_TASK;
            } else if (component.getName().equals(BPMNShapType.USER_TASK.getKey())) {
                retVal = BPMNShapType.USER_TASK;
            } else if (component.getName().equals(BPMNShapType.SEND_TASK.getKey())) {
                retVal = BPMNShapType.SEND_TASK;
            } else if (component.getName().equals(BPMNShapType.RECEIVE_TASK.getKey())) {
                retVal = BPMNShapType.RECEIVE_TASK;
            } else if (component.getName().equals(BPMNShapType.SUB_PROCESS.getKey())) {
                retVal = BPMNShapType.SUB_PROCESS;
            } else if (component.getName().equals(BPMNShapType.CALL_ACTIVITY.getKey())) {
                retVal = BPMNShapType.CALL_ACTIVITY;
            } else if (component.getName().equals(BPMNShapType.INTERMEDIATE_CATCH_EVENT.getKey())) {
                retVal = BPMNShapType.INTERMEDIATE_CATCH_EVENT;
            } else if (component.getName().equals(BPMNShapType.COMPLEX_GATEWAY.getKey())) {
                retVal = BPMNShapType.COMPLEX_GATEWAY;
            } else if (component.getName().equals(BPMNShapType.EVENT_BASED_GATEWAY.getKey())) {
                retVal = BPMNShapType.EVENT_BASED_GATEWAY;
            } else if (component.getName().equals(BPMNShapType.TRANSACTION.getKey())) {
                retVal = BPMNShapType.TRANSACTION;
            } else if (component.getName().equals(BPMNShapType.TEXT_ANNOTATION.getKey())) {
                retVal = BPMNShapType.TEXT_ANNOTATION;
            } else {
                Element root;
                if (component.getName().equals("participant")) {
                    id = component.attributeValue("id");
                    String processRef = component.attributeValue("processRef");
                    root = component.getDocument().getRootElement();
                    Element process = (Element) root.selectSingleNode("//*[@id='" + processRef + "']");
                    if (process != null && process.element("laneSet") != null) {
                        Element shap = (Element) root.selectSingleNode("//*[@bpmnElement='" + id + "']");
                        String isHorizontal = shap.attributeValue("isHorizontal");
                        if (isHorizontal != null && isHorizontal.equalsIgnoreCase("false")) {
                            retVal = BPMNShapType.V_POOL;
                        } else {
                            retVal = BPMNShapType.H_POOL;
                        }
                    } else {
                        retVal = BPMNShapType.H_POOL;
                    }
                } else if (component.getName().equals("lane")) {
                    id = component.attributeValue("id");
                    root = (Element) component.getDocument().getRootElement().selectSingleNode("//*[@bpmnElement='" + id + "']");
                    String isHorizontal = root.attributeValue("isHorizontal");
                    if (isHorizontal != null && isHorizontal.equalsIgnoreCase("false")) {
                        retVal = BPMNShapType.V_LANE;
                    } else {
                        retVal = BPMNShapType.H_LANE;
                    }
                }
            }
        }

        return retVal;
    }
}

