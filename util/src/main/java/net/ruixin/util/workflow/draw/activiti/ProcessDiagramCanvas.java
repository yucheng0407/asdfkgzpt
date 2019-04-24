package net.ruixin.util.workflow.draw.activiti;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Paint;
import java.awt.Polygon;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Stroke;
import java.awt.geom.AffineTransform;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Rectangle2D;
import java.awt.geom.RoundRectangle2D;
import java.awt.geom.Ellipse2D.Double;
import java.awt.image.BufferedImage;
import java.awt.image.ImageObserver;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import javax.imageio.ImageIO;

import net.coobird.thumbnailator.Thumbnails;
import net.ruixin.util.workflow.constant.ProcessDiagram;
import net.ruixin.util.workflow.draw.bpmn.BPMNEdge;
import net.ruixin.util.workflow.draw.bpmn.DirectionType;
import net.ruixin.util.workflow.draw.bpmn.FlowType;
import net.ruixin.util.workflow.draw.engine.ActivitiException;
import net.ruixin.util.workflow.draw.entity.FlowImageStyle;
import net.ruixin.util.workflow.draw.entity.ImageType;
import net.ruixin.util.workflow.draw.util.IoUtil;
import net.ruixin.util.workflow.draw.util.ProcessDiagramColorUtil;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;

public class ProcessDiagramCanvas {
    protected static final Logger LOGGER = Logger.getLogger(ProcessDiagramCanvas.class.getName());
    protected static final int ARROW_WIDTH = 5;
    protected static final int CONDITIONAL_INDICATOR_WIDTH = 16;
    protected static final int MARKER_WIDTH = 12;
    protected static Color DEFAULT_COLOR = ProcessDiagramColorUtil.getColor("default", "#000000");
    protected static Color START_COLOR = ProcessDiagramColorUtil.getColor("start", "#00000");
    protected static Color END_COLOR = ProcessDiagramColorUtil.getColor("end", "#00000");
    protected static Color POOL_BOUNDARY_COLOR;
    protected static Color LANE_BOUNDARY_COLOR;
    protected static Color POOL_BACKGROUP_COLOR;
    protected static Color LANE_BACKGROUP_COLOR;
    protected static Color TASK_COLOR = ProcessDiagramColorUtil.getColor("task", "#f2f7fd");
    protected static Color EVENT_BOUNDARY_COLOR = ProcessDiagramColorUtil.getColor("eventBoundary", "#FFFFFF");
    protected static Color CONDITIONAL_INDICATOR_COLOR = ProcessDiagramColorUtil.getColor("conditional", "#FFFFFF");
    protected static Color HIGHLIGHT_COLOR;
    protected static Color LINE_COLOR;
    protected static Stroke THIN_TASK_BORDER_STROKE;
    protected static Stroke THICK2_TASK_BORDER_STROKE;
    protected static Stroke THICK3_TASK_BORDER_STROKE;
    protected static Stroke GATEWAY_TYPE_STROKE;
    protected static Stroke START_EVENT_STROKE;
    protected static Stroke END_EVENT_STROKE;
    protected static Stroke MULTI_INSTANCE_STROKE;
    protected static Stroke LABEL_STROKE;
    protected static Stroke DASHED_STROKE;
    protected static int ICON_SIZE;
    protected static Image USERTASK_IMAGE;
    protected static Image SCRIPTTASK_IMAGE;
    protected static Image SERVICETASK_IMAGE;
    protected static Image RECEIVETASK_IMAGE;
    protected static Image SENDTASK_IMAGE;
    protected static Image MANUALTASK_IMAGE;
    protected static Image TIMER_IMAGE;
    protected static Image ERROR_THROW_IMAGE;
    protected static Image ERROR_CATCH_IMAGE;
    protected static Image CALLACTIVITY_IMAGE;
    protected static Image PARALLEL_IMAGE;
    protected static Image SEQUENTIAL_IMAGE;

    protected int originalCanvasWidth;
    protected int originalCanvasHeight;
    protected int canvasWidth;
    protected int canvasHeight;
    protected int originalMinX;
    protected int originalMinY;
    protected int minX;
    protected int minY;
    protected BufferedImage processDiagram;
    protected Graphics2D g;
    protected FontMetrics fontMetrics;
    protected boolean closed;
    protected static Map<Short, Color> colorsMap;

    static {
        HIGHLIGHT_COLOR = Color.RED;
        LINE_COLOR = Color.black;
        THIN_TASK_BORDER_STROKE = new BasicStroke(1.0F * ProcessDiagramGenerator.SCALING);
        THICK2_TASK_BORDER_STROKE = new BasicStroke(2.0F * ProcessDiagramGenerator.SCALING);
        THICK3_TASK_BORDER_STROKE = new BasicStroke(3.0F * ProcessDiagramGenerator.SCALING);
        GATEWAY_TYPE_STROKE = new BasicStroke(3.0F * ProcessDiagramGenerator.SCALING);
        START_EVENT_STROKE = new BasicStroke(1.0F * ProcessDiagramGenerator.SCALING);
        END_EVENT_STROKE = new BasicStroke(3.5F * ProcessDiagramGenerator.SCALING);
        MULTI_INSTANCE_STROKE = new BasicStroke(1.3F * ProcessDiagramGenerator.SCALING);
        LABEL_STROKE = new BasicStroke(1.0F * ProcessDiagramGenerator.SCALING);
        DASHED_STROKE = new BasicStroke(2.5F * ProcessDiagramGenerator.SCALING, BasicStroke.CAP_BUTT, BasicStroke.JOIN_ROUND, 3.5F * ProcessDiagramGenerator.SCALING, new float[]{2.0F * ProcessDiagramGenerator.SCALING, 2.0F * ProcessDiagramGenerator.SCALING}, 0.0F * ProcessDiagramGenerator.SCALING);
        ICON_SIZE = 16 * ProcessDiagramGenerator.SCALING;
        colorsMap = new HashMap();

        try {
            USERTASK_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/user.png"));
            SCRIPTTASK_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/script.png"));
            SERVICETASK_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/service.png"));
            RECEIVETASK_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/receive.png"));
            SENDTASK_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/send.png"));
            MANUALTASK_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/manual.png"));
            TIMER_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/timer.png"));
            ERROR_THROW_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/error_throw.png"));
            ERROR_CATCH_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/error_catch.png"));
            CALLACTIVITY_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/call_activity.png"));
            PARALLEL_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/parallel-mi-marker.png"));
            SEQUENTIAL_IMAGE = ImageIO.read(ResourceUtils.getFile("classpath:image/sequential-mi-marker.png"));
            POOL_BACKGROUP_COLOR = ProcessDiagramColorUtil.getColor("pool_backgroup", "#FFFFFF");
            LANE_BACKGROUP_COLOR = ProcessDiagramColorUtil.getColor("lane_backgroup", "#FFFFFF");
            POOL_BOUNDARY_COLOR = new Color(138, 140, 142);
            LANE_BOUNDARY_COLOR = new Color(138, 140, 142);
        } catch (IOException var1) {
            LOGGER.warning("Could not load image for process diagram creation: " + var1.getMessage());
        }

    }

    public ProcessDiagramCanvas(int width, int height) {
        this.originalCanvasWidth = width;
        this.originalCanvasHeight = height;
        this.canvasWidth = width * ProcessDiagramGenerator.SCALING;
        this.canvasHeight = height * ProcessDiagramGenerator.SCALING;
        // TYPE_INT_ARGB
        this.processDiagram = new BufferedImage(this.canvasWidth, this.canvasHeight, BufferedImage.TYPE_INT_ARGB);
        this.g = this.processDiagram.createGraphics();
        //抗锯齿
        this.g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        this.g.setPaint(LINE_COLOR);
        this.g.setFont(ProcessDiagramGenerator.GENERAL_FONT);
        this.g.setStroke(new BasicStroke(1.0F * ProcessDiagramGenerator.SCALING));
        this.fontMetrics = this.g.getFontMetrics();
    }

    public ProcessDiagramCanvas(int width, int height, int minX, int minY) {
        this(width, height);
        this.originalMinX = minX;
        this.originalMinY = minY;
        this.minX = minX * ProcessDiagramGenerator.SCALING;
        this.minY = minY * ProcessDiagramGenerator.SCALING;
    }

    public InputStream generateImage(ImageType imageType) {
        if (this.closed) {
            throw new ActivitiException("ProcessDiagramGenerator already closed");
        } else {
            ByteArrayOutputStream out = new ByteArrayOutputStream();

            try {
                this.minX = this.minX <= 5 * ProcessDiagramGenerator.SCALING ? 5 * ProcessDiagramGenerator.SCALING : this.minX;
                this.minY = this.minY <= 5 * ProcessDiagramGenerator.SCALING ? 5 * ProcessDiagramGenerator.SCALING : this.minY;
                BufferedImage imageToSerialize = this.processDiagram;
                if (this.minX >= 0 && this.minY >= 0) {
                    imageToSerialize = this.processDiagram.getSubimage(this.minX - 5 * ProcessDiagramGenerator.SCALING, this.minY - 5 * ProcessDiagramGenerator.SCALING, this.canvasWidth - this.minX + 5 * ProcessDiagramGenerator.SCALING, this.canvasHeight - this.minY + 5 * ProcessDiagramGenerator.SCALING);
                }
                ImageIO.write(imageToSerialize, imageType.getKey(), out);
            } catch (IOException var7) {
                throw new ActivitiException("Error while generating process image", var7);
            } finally {
                IoUtil.closeSilently(out);
            }

            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    public void close() {
        this.g.dispose();
        this.closed = true;
    }

    public void drawNoneStartEvent(String name, int x, int y, int width, int height) {
        this.drawStartEvent(name, x, y, width, height, (Image) null);
    }

    public void drawTimerStartEvent(String name, int x, int y, int width, int height) {
        this.drawStartEvent(name, x, y, width, height, TIMER_IMAGE);
    }

    public void drawStartEvent(String name, int x, int y, int width, int height, Image image) {
        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(START_COLOR);
        this.g.setStroke(START_EVENT_STROKE);
        this.g.draw(new Double((double) x, (double) y, (double) width, (double) height));
        if (image != null) {
            this.g.drawImage(image, x, y, width, height, null);
        }

        this.g.setStroke(originalStroke);
        this.g.setPaint(originalPaint);
        if (name != null) {
            this.g.drawString(this.fitTextToWidth(name, width), x + (5 * ProcessDiagramGenerator.SCALING), y + (50 * ProcessDiagramGenerator.SCALING));
        }

    }

    public void drawNoneEndEvent(String name, int x, int y, int width, int height) {
        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(END_COLOR);
        this.g.setStroke(END_EVENT_STROKE);
        this.g.draw(new Double((double) x, (double) y, (double) width, (double) height));
        this.g.setStroke(originalStroke);
        this.g.setPaint(originalPaint);
        if (name != null) {
            this.g.drawString(this.fitTextToWidth(name, width), x + (5 * ProcessDiagramGenerator.SCALING), y + (50 * ProcessDiagramGenerator.SCALING));
        }

    }

    public void drawErrorEndEvent(String name, int x, int y, int width, int height) {
        this.drawNoneEndEvent(name, x, y, width, height);
        this.g.drawImage(ERROR_THROW_IMAGE, x + 3, y + 3, width - 6, height - 6, (ImageObserver) null);
    }

    public void drawCatchingEvent(int x, int y, int width, int height, Image image) {
        Ellipse2D outerCircle = new Double((double) x, (double) y, (double) width, (double) height);
        int innerCircleX = x + 3;
        int innerCircleY = y + 3;
        int innerCircleWidth = width - 6;
        int innerCircleHeight = height - 6;
        Ellipse2D innerCircle = new Double((double) innerCircleX, (double) innerCircleY, (double) innerCircleWidth, (double) innerCircleHeight);
        Paint originalPaint = this.g.getPaint();
        this.g.setPaint(EVENT_BOUNDARY_COLOR);
        this.g.fill(outerCircle);
        this.g.setPaint(originalPaint);
        this.g.draw(outerCircle);
        this.g.draw(innerCircle);
        this.g.drawImage(image, innerCircleX, innerCircleY, innerCircleWidth, innerCircleHeight, (ImageObserver) null);
    }

    public void drawCatchingTimerEvent(int x, int y, int width, int height) {
        this.drawCatchingEvent(x, y, width, height, TIMER_IMAGE);
    }

    public void drawCatchingErroEvent(int x, int y, int width, int height) {
        this.drawCatchingEvent(x, y, width, height, ERROR_CATCH_IMAGE);
    }

    public void drawSequenceflow(int srcX, int srcY, int targetX, int targetY, boolean conditional) {
        java.awt.geom.Line2D.Double line = new java.awt.geom.Line2D.Double((double) srcX, (double) srcY, (double) targetX, (double) targetY);
        this.g.draw(line);
        this.drawArrowHead(line);
        if (conditional) {
            this.drawConditionalSequenceFlowIndicator(line);
        }

    }

    public void drawSequenceflowWithoutArrow(int srcX, int srcY, int targetX, int targetY, boolean conditional) {
        java.awt.geom.Line2D.Double line = new java.awt.geom.Line2D.Double((double) srcX, (double) srcY, (double) targetX, (double) targetY);
        this.g.draw(line);
        if (conditional) {
            this.drawConditionalSequenceFlowIndicator(line);
        }

    }

    public void drawSequenceflow(List<java.awt.geom.Point2D.Double> points, FlowType flowType) {
        for (int i = 0; i < points.size() - 1; ++i) {
            java.awt.geom.Line2D.Double line = new java.awt.geom.Line2D.Double(points.get(i).getX() * ProcessDiagramGenerator.SCALING, points.get(i).getY() * ProcessDiagramGenerator.SCALING, points.get(i + 1).getX() * ProcessDiagramGenerator.SCALING, points.get(i + 1).getY() * ProcessDiagramGenerator.SCALING);
            if (flowType.equals(FlowType.ASSOCIATION)) {
                this.g.setStroke(DASHED_STROKE);
            } else {
                this.g.setStroke(LABEL_STROKE);
            }

            this.g.draw(line);
            if (i == points.size() - 2 && flowType.equals(FlowType.SEQUENCE_FLOW)) {
                this.drawArrowHead(line);
            }
        }

    }

    public void drawSequenceflowWidthLabel(BPMNEdge bpmnEdge) {
        this.drawSequenceflow(bpmnEdge.getPoints(), bpmnEdge.getFlowType());
        this.drawSequenceflowLabel(bpmnEdge.getName(), (int) bpmnEdge.getMidpoint().getX(), (int) bpmnEdge.getMidpoint().getY(), bpmnEdge.getDirection());
    }

    public void drawSequenceflowLabel(String name, int x, int y, DirectionType directionType) {
        if (name != null) {
            int drawX = x;
            int drawY = y;
            switch (directionType.ordinal()) {
                case 1:
                    drawX = x + this.g.getFontMetrics().getHeight() / 2;
                    drawY = y;
                    break;
                case 2:
                    drawX = x - this.g.getFontMetrics().stringWidth(name) - this.g.getFontMetrics().getHeight() / 2;
                    drawY = y + this.g.getFontMetrics().getHeight();
                    break;
                case 3:
                    drawX = x - this.g.getFontMetrics().stringWidth(name) / 2;
                    drawY = y - this.g.getFontMetrics().getHeight() / 2;
                    break;
                case 4:
                    drawX = x - this.g.getFontMetrics().stringWidth(name) / 2;
                    drawY = y + this.g.getFontMetrics().getHeight();
                    break;
                default:
                    break;
            }

            Paint originalPaint = this.g.getPaint();
            Stroke originalStroke = this.g.getStroke();
            this.g.setPaint(LINE_COLOR);
            this.g.setStroke(LABEL_STROKE);
            this.g.drawString(name, drawX, drawY);
            this.g.setStroke(originalStroke);
            this.g.setPaint(originalPaint);
        }
    }

    public void drawArrowHead(java.awt.geom.Line2D.Double line) {
        int doubleArrowWidth = 10;
        Polygon arrowHead = new Polygon();
        arrowHead.addPoint(0, 0);
        arrowHead.addPoint(-5, -doubleArrowWidth);
        arrowHead.addPoint(5, -doubleArrowWidth);
        AffineTransform transformation = new AffineTransform();
        transformation.setToIdentity();
        double angle = Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
        transformation.translate(line.x2, line.y2);
        transformation.rotate(angle - 1.570796326794897D);
        AffineTransform originalTransformation = this.g.getTransform();
        this.g.setTransform(transformation);
        this.g.fill(arrowHead);
        this.g.setTransform(originalTransformation);
    }

    public void drawConditionalSequenceFlowIndicator(java.awt.geom.Line2D.Double line) {
        int horizontal = 11;
        int halfOfHorizontal = horizontal / 2;
        int halfOfVertical = 8;
        Polygon conditionalIndicator = new Polygon();
        conditionalIndicator.addPoint(0, 0);
        conditionalIndicator.addPoint(-halfOfHorizontal, halfOfVertical);
        conditionalIndicator.addPoint(0, 16);
        conditionalIndicator.addPoint(halfOfHorizontal, halfOfVertical);
        AffineTransform transformation = new AffineTransform();
        transformation.setToIdentity();
        double angle = Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
        transformation.translate(line.x1, line.y1);
        transformation.rotate(angle - 1.570796326794897D);
        AffineTransform originalTransformation = this.g.getTransform();
        this.g.setTransform(transformation);
        this.g.draw(conditionalIndicator);
        Paint originalPaint = this.g.getPaint();
        this.g.setPaint(CONDITIONAL_INDICATOR_COLOR);
        this.g.fill(conditionalIndicator);
        this.g.setPaint(originalPaint);
        this.g.setTransform(originalTransformation);
    }

    public void drawTask(String name, int x, int y, int width, int height) {
        this.drawTask(name, x, y, width, height, false);
    }

    protected void drawTask(String name, int x, int y, int width, int height, boolean thickBorder) {
        Paint originalPaint = this.g.getPaint();
        this.g.setPaint(TASK_COLOR);
        RoundRectangle2D rect = new java.awt.geom.RoundRectangle2D.Double((double) x, (double) y, (double) width, (double) height, 20.0D, 20.0D);
        this.g.fill(rect);
        this.g.setPaint(originalPaint);
        if (thickBorder) {
            this.g.setStroke(THICK3_TASK_BORDER_STROKE);
            this.g.draw(rect);
        } else {
            this.g.setStroke(THIN_TASK_BORDER_STROKE);
            this.g.draw(rect);
        }

        if (name != null) {
            String[] nameAry = this.fitTextToWidthAndBreak(name, width);
            int offsetY = this.fontMetrics.getHeight();
            //调整y轴计算逻辑重新计算文字位置
            int textY = y + (height + offsetY / 2) / 2;

            for (int i = 0; i < nameAry.length; ++i) {
                String l = nameAry[i];
                int textX = x + (width - this.fontMetrics.stringWidth(l)) / 2;
                this.g.drawString(l, textX, textY + i * offsetY);
            }
        }

    }

    private String[] fitTextToWidthAndBreak(String original, int width) {
        String line1 = "";
        String tmp1 = "";
        String line2 = "";
        int maxWidth = width;
        if (this.fontMetrics.stringWidth(original) <= width) {
            return new String[]{original};
        } else {
            while (this.fontMetrics.stringWidth(tmp1) <= maxWidth) {
                line1 = tmp1;
                tmp1 = original.substring(0, tmp1.length() + 1);
            }

            line2 = original.substring(line1.length(), original.length());
            if (this.fontMetrics.stringWidth(line2) <= maxWidth) {
                return new String[]{line1, line2};
            } else {
                while (this.fontMetrics.stringWidth(line2 + "...") > maxWidth && line2.length() > 0) {
                    line2 = line2.substring(0, line2.length() - 1);
                }

                if (!line2.equals(original)) {
                    line2 = line2 + "...";
                }

                return new String[]{line1, line2};
            }
        }
    }

    protected String fitTextToWidth(String original, int width) {
        String line1 = "";
        String tmp1 = "";
        String line2 = "";
        int maxWidth = width - 10;
        if (this.fontMetrics.stringWidth(original) <= maxWidth) {
            return original;
        } else {
            while (this.fontMetrics.stringWidth(tmp1) <= maxWidth) {
                line1 = tmp1;
                tmp1 = original.substring(0, tmp1.length() + 1);
            }

            for (line2 = original.substring(line1.length(), original.length()); this.fontMetrics.stringWidth(line2 + "...") > maxWidth && line2.length() > 0; line2 = line2.substring(0, line2.length() - 1)) {
                ;
            }

            if (!line2.equals(original)) {
                line2 = line2 + "...";
            }

            return line1 + "\r\n" + line2;
        }
    }

    public void drawTask(Image img, String name, int x, int y, int width, int height) {
        this.drawTask(name, x, y, width, height);
        this.g.drawImage(img, x + 5, y + 8, ICON_SIZE, ICON_SIZE, (ImageObserver) null);
    }

    public void drawUserTask(String name, int x, int y, int width, int height) {
        this.drawTask(USERTASK_IMAGE, name, x, y, width, height);
    }

    public void drawScriptTask(String name, int x, int y, int width, int height) {
        this.drawTask(SCRIPTTASK_IMAGE, name, x, y, width, height);
    }

    public void drawServiceTask(String name, int x, int y, int width, int height) {
        this.drawTask(SERVICETASK_IMAGE, name, x, y, width, height);
    }

    public void drawReceiveTask(String name, int x, int y, int width, int height) {
        this.drawTask(RECEIVETASK_IMAGE, name, x, y, width, height);
    }

    public void drawSendTask(String name, int x, int y, int width, int height) {
        this.drawTask(SENDTASK_IMAGE, name, x, y, width, height);
    }

    public void drawManualTask(String name, int x, int y, int width, int height) {
        this.drawTask(MANUALTASK_IMAGE, name, x, y, width, height);
    }

    public void drawExpandedSubProcess(String name, int x, int y, int width, int height) {
        RoundRectangle2D rect = new java.awt.geom.RoundRectangle2D.Double((double) x, (double) y, (double) width, (double) height, 20.0D, 20.0D);
        this.g.draw(rect);
        String text = this.fitTextToWidth(name, width);
        this.g.drawString(text, x + 10, y + 15);
    }

    public void drawCollapsedSubProcess(String name, int x, int y, int width, int height) {
        this.drawCollapsedTask(name, x, y, width, height, false);
    }

    public void drawCollapsedCallActivity(String name, int x, int y, int width, int height) {
        this.drawCollapsedTask(name, x, y, width, height, false);
        int ix = x + (width - ICON_SIZE) / 2;
        int iy = y + height - ICON_SIZE - 5;
        this.g.drawImage(CALLACTIVITY_IMAGE, ix, iy, ICON_SIZE, ICON_SIZE, (ImageObserver) null);
    }

    protected void drawCollapsedTask(String name, int x, int y, int width, int height, boolean thickBorder) {
        this.drawTask(name, x, y, width, height, thickBorder);
    }

    public void drawCollapsedMarker(int x, int y, int width, int height) {
        int rectangleWidth = 12;
        int rectangleHeight = 12;
        Rectangle rect = new Rectangle(x + (width - rectangleWidth) / 2, y + height - rectangleHeight - 3, rectangleWidth, rectangleHeight);
        this.g.draw(rect);
        java.awt.geom.Line2D.Double line = new java.awt.geom.Line2D.Double(rect.getCenterX(), rect.getY() + 2.0D, rect.getCenterX(), rect.getMaxY() - 2.0D);
        this.g.draw(line);
        line = new java.awt.geom.Line2D.Double(rect.getMinX() + 2.0D, rect.getCenterY(), rect.getMaxX() - 2.0D, rect.getCenterY());
        this.g.draw(line);
    }

    public void drawActivityMarkers(int x, int y, int width, int height, boolean multiInstanceSequential, boolean multiInstanceParallel, boolean collapsed) {
        if (collapsed) {
            if (!multiInstanceSequential && !multiInstanceParallel) {
                this.drawCollapsedMarker(x, y, width, height);
            } else {
                this.drawCollapsedMarker(x - 6 - 2, y, width, height);
                if (multiInstanceSequential) {
                    this.drawMultiInstanceMarker(true, x + 6 + 2, y, width, height);
                } else if (multiInstanceParallel) {
                    this.drawMultiInstanceMarker(false, x + 6 + 2, y, width, height);
                }
            }
        } else if (multiInstanceSequential) {
            this.drawMultiInstanceMarker(false, x, y, width, height);
        } else if (multiInstanceParallel) {
            this.drawMultiInstanceMarker(true, x, y, width, height);
        }

    }

    public void drawGateway(String name, int x, int y, int width, int height) {
        Polygon rhombus = new Polygon();
        rhombus.addPoint(x, y + height / 2);
        rhombus.addPoint(x + width / 2, y + height);
        rhombus.addPoint(x + width, y + height / 2);
        rhombus.addPoint(x + width / 2, y);
        this.g.draw(rhombus);
        if (name != null && !name.endsWith("Gateway")) {
            int textX = x + width / 4 - this.fontMetrics.stringWidth(name) - this.fontMetrics.getHeight() / 4;
            int textY = y + height / 4 - this.fontMetrics.getHeight() / 4;
            this.g.drawString(name, textX, textY);
        }

    }

    public void drawParallelGateway(String name, int x, int y, int width, int height) {
        this.drawGateway(name, x, y, width, height);
        Stroke orginalStroke = this.g.getStroke();
        this.g.setStroke(GATEWAY_TYPE_STROKE);
        java.awt.geom.Line2D.Double line = new java.awt.geom.Line2D.Double((double) (x + 10), (y + height / 2d), (double) (x + width - 10), (y + height / 2d));
        this.g.draw(line);
        line = new java.awt.geom.Line2D.Double((x + width / 2d), (double) (y + height - 10), (x + width / 2d), (double) (y + 10));
        this.g.draw(line);
        this.g.setStroke(orginalStroke);
    }

    public void drawExclusiveGateway(String name, int x, int y, int width, int height) {
        this.drawGateway(name, x, y, width, height);
        int quarterWidth = width / 4;
        int quarterHeight = height / 4;
        Stroke orginalStroke = this.g.getStroke();
        this.g.setStroke(GATEWAY_TYPE_STROKE);
        java.awt.geom.Line2D.Double line = new java.awt.geom.Line2D.Double((double) (x + quarterWidth + 3), (double) (y + quarterHeight + 3), (double) (x + 3 * quarterWidth - 3), (double) (y + 3 * quarterHeight - 3));
        this.g.draw(line);
        line = new java.awt.geom.Line2D.Double((double) (x + quarterWidth + 3), (double) (y + 3 * quarterHeight - 3), (double) (x + 3 * quarterWidth - 3), (double) (y + quarterHeight + 3));
        this.g.draw(line);
        this.g.setStroke(orginalStroke);
    }

    public void drawInclusiveGateway(String name, int x, int y, int width, int height) {
        this.drawGateway(name, x, y, width, height);
        int diameter = width / 2;
        Stroke orginalStroke = this.g.getStroke();
        this.g.setStroke(GATEWAY_TYPE_STROKE);
        Double circle = new Double(((width - diameter) / 2d + x), ((height - diameter) / 2d + y), (double) diameter, (double) diameter);
        this.g.draw(circle);
        this.g.setStroke(orginalStroke);
    }

    public void drawMultiInstanceMarker(boolean sequential, int x, int y, int width, int height) {
        int ix = x + (width - ICON_SIZE) / 2;
        int iy = y + height - ICON_SIZE - 2;
        Image image = sequential ? PARALLEL_IMAGE : SEQUENTIAL_IMAGE;
        this.g.drawImage(image, ix, iy, ICON_SIZE, ICON_SIZE, (ImageObserver) null);
    }

    public void drawHighLight(int x, int y, int width, int height) {
        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(HIGHLIGHT_COLOR);
        this.g.setStroke(THICK2_TASK_BORDER_STROKE);
        RoundRectangle2D rect = new java.awt.geom.RoundRectangle2D.Double((double) x, (double) y, (double) width, (double) height, 20.0D, 20.0D);
        this.g.draw(rect);
        this.g.setPaint(originalPaint);
        this.g.setStroke(originalStroke);
    }

    public void drawHighLight(int x, int y, int width, int height, FlowImageStyle style) {
        String borderColor = "";
        float borderWidth = 1.0F * ProcessDiagramGenerator.SCALING;
        if (style != null) {
            borderColor = style.getBorderColor() != null ? style.getBorderColor() : "#000000";
            borderWidth = style.getBorderWidth() != null ? style.getBorderWidth() : 2.0F * ProcessDiagramGenerator.SCALING;
        } else {
            borderColor = ProcessDiagramColorUtil.getColorString("default", "#000000");
        }

        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(Color.decode(borderColor));
        this.g.setStroke(new BasicStroke(borderWidth));
        RoundRectangle2D rect = new java.awt.geom.RoundRectangle2D.Double((double) x, (double) y, (double) width, (double) height, 20.0D, 20.0D);
        this.g.draw(rect);
        this.g.setPaint(originalPaint);
        this.g.setStroke(originalStroke);
    }

    public void drawHPool(String name, int x, int y, int width, int height) {
        Rectangle2D rect = new java.awt.geom.Rectangle2D.Double((double) x, (double) y, (double) width, (double) height);
        Paint originalPaint = this.g.getPaint();
        this.g.setPaint(POOL_BACKGROUP_COLOR);
        RoundRectangle2D roundRectangle2D = new java.awt.geom.RoundRectangle2D.Double((double) x, (double) y, (double) width, (double) height, 0.0D, 0.0D);
        this.g.fill(roundRectangle2D);
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(POOL_BOUNDARY_COLOR);
        this.g.draw(rect);
        int textLen = this.fontMetrics.stringWidth(name);
        int textX = x + this.fontMetrics.getHeight() / 2;
        int textY = y + height / 2 - textLen / 2;
        AffineTransform oldAffineTransform = this.g.getTransform();
        AffineTransform newAffineTransform = AffineTransform.getRotateInstance(-1.5707963267948966D, (double) textX, (double) textY);
        this.g.setTransform(newAffineTransform);
        this.g.setPaint(DEFAULT_COLOR);
        this.g.drawString(name, textX - textLen, textY + this.fontMetrics.getHeight() / 2);
        this.g.setTransform(oldAffineTransform);
        this.g.setStroke(originalStroke);
        this.g.setPaint(originalPaint);
    }

    public void drawHLane(String name, int x, int y, int width, int height) {
        Rectangle2D rect = new java.awt.geom.Rectangle2D.Double((double) x, (double) y, (double) width, (double) height);
        Paint originalPaint = this.g.getPaint();
        this.g.setPaint(LANE_BACKGROUP_COLOR);
        RoundRectangle2D roundRectangle2D = new java.awt.geom.RoundRectangle2D.Double((double) x, (double) y, 20.0D, (double) height, 0.0D, 0.0D);
        this.g.fill(roundRectangle2D);
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(LANE_BOUNDARY_COLOR);
        this.g.draw(rect);
        int textLen = this.fontMetrics.stringWidth(name);
        int textX = x + this.fontMetrics.getHeight() / 2;
        int textY = y + height / 2 - textLen / 2;
        AffineTransform oldAffineTransform = this.g.getTransform();
        AffineTransform newAffineTransform = AffineTransform.getRotateInstance(-1.5707963267948966D, (double) textX, (double) textY);
        this.g.setTransform(newAffineTransform);
        this.g.setPaint(DEFAULT_COLOR);
        this.g.drawString(name, textX - textLen, textY + this.fontMetrics.getHeight() / 2);
        this.g.setTransform(oldAffineTransform);
        this.g.setStroke(originalStroke);
        this.g.setPaint(originalPaint);
    }

    public void drawVPool(String name, int x, int y, int width, int height) {
        Rectangle2D rect = new java.awt.geom.Rectangle2D.Double((double) x, (double) y, (double) width, (double) height);
        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(POOL_BACKGROUP_COLOR);
        RoundRectangle2D roundRectangle2D = new java.awt.geom.RoundRectangle2D.Double((double) x, (double) y, (double) width, 20.0D, 0.0D, 0.0D);
        this.g.fill(roundRectangle2D);
        this.g.setPaint(POOL_BOUNDARY_COLOR);
        this.g.draw(rect);
        name = this.fitTextToWidth(name, width);
        int textLen = this.fontMetrics.stringWidth(name);
        int textY = y + this.fontMetrics.getHeight();
        int textX = x + width / 2 - textLen / 2;
        this.g.setPaint(DEFAULT_COLOR);
        this.g.drawString(name, textX, textY);
        this.g.setStroke(originalStroke);
        this.g.setPaint(originalPaint);
    }

    public void drawVLane(String name, int x, int y, int width, int height) {
        Rectangle2D rect = new java.awt.geom.Rectangle2D.Double((double) x, (double) y, (double) width, (double) height);
        Paint originalPaint = this.g.getPaint();
        Stroke originalStroke = this.g.getStroke();
        this.g.setPaint(LANE_BACKGROUP_COLOR);
        RoundRectangle2D roundRectangle2D = new java.awt.geom.RoundRectangle2D.Double((double) x, (double) y, (double) width, 20.0D, 0.0D, 0.0D);
        this.g.fill(roundRectangle2D);
        this.g.setPaint(LANE_BOUNDARY_COLOR);
        this.g.draw(rect);
        name = this.fitTextToWidth(name, width);
        int textLen = this.fontMetrics.stringWidth(name);
        int textY = y + this.fontMetrics.getHeight();
        int textX = x + width / 2 - textLen / 2;
        this.g.setPaint(DEFAULT_COLOR);
        this.g.drawString(name, textX, textY);
        this.g.setStroke(originalStroke);
        this.g.setPaint(originalPaint);
    }

    public void drawTextAnnotation(String name, int x, int y, int width, int height) {
    }
}
