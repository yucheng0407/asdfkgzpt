package net.ruixin.util.tools;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import javax.xml.XMLConstants;
import javax.xml.transform.*;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.DocumentResult;
import org.dom4j.io.DocumentSource;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.SAXException;

public class Dom4jUtil {
    private static final Logger logger = LoggerFactory.getLogger(Dom4jUtil.class);
    private static final String TRANSFORMER_FACTORY = "javax.xml.transform.TransformerFactory";
    private static final String TRANSFORMER_FACTORY_IMPL = "org.apache.xalan.processor.TransformerFactoryImpl";

    private Dom4jUtil() {
    }

    public static Document loadXml(String s) {
        Document document = null;

        try {
            document = DocumentHelper.parseText(s);
        } catch (Exception var3) {
            logger.error("load XML string error:{}", var3.getMessage());
        }

        return document;
    }

    public static Document load(String filename, String encode) {
        Document document = null;

        try {
            SAXReader saxReader = new SAXReader();
            saxReader.setEncoding(encode);
            document = saxReader.read(new File(filename));
        } catch (Exception var4) {
            logger.error("load XML File error:{}", var4.getMessage());
        }

        return document;
    }

    public static Document loadXml(String xml, String encode) throws UnsupportedEncodingException {
        ByteArrayInputStream inputStream = new ByteArrayInputStream(xml.getBytes(encode));
        return loadXml((InputStream)inputStream, encode);
    }

    public static Document loadXml(InputStream is) {
        return loadXml(is, "UTF-8");
    }

    public static Document loadXml(InputStream is, String charset) {
        Document document = null;

        try {
            SAXReader reader = new SAXReader();
            reader.setEncoding(charset);
            document = reader.read(is);
        } catch (Exception var4) {
            logger.error("load XML File error:{}", var4.getMessage());
        }

        return document;
    }

    public static void write(Document document, String fileName) throws IOException {
        String xml = document.asXML();
        RxFileUtils.writeFile(fileName, xml);
    }

    public static void write(String str, String fileName) throws IOException, DocumentException {
        Document document = DocumentHelper.parseText(str);
        write(document, fileName);
    }

    public Document load(URL url) throws DocumentException {
        SAXReader reader = new SAXReader();
        return reader.read(url);
    }

    public static Document load(String filename) {
        Document document = null;

        try {
            SAXReader reader = new SAXReader();
            document = reader.read(new File(filename));
            document.normalize();
        } catch (Exception var3) {
            logger.error("load XML File error:{}", var3.getMessage());
        }

        return document;
    }

    public static Document loadByClassPath(String filePath) throws IOException, DocumentException {
        return loadByClassPath(filePath, "UTF-8");
    }

    public static Document loadByClassPath(String filePath, String charset) throws IOException, DocumentException {
        return loadByClassPath(filePath, charset, (ClassLoader)null);
    }

    public static Document loadByClassPath(String filePath, String charset, ClassLoader classLoader) throws IOException, DocumentException {
        InputStreamReader isr = null;
        Document document = null;
        URL url = null;
        if (classLoader != null) {
            url = classLoader.getResource("/" + filePath);
        } else {
            url = Dom4jUtil.class.getResource("/" + filePath);
        }

        Document var8;
        try {
            isr = new InputStreamReader(url.openStream());
            SAXReader reader = new SAXReader();
            reader.setEncoding(charset);
            document = reader.read(isr);
            document.normalize();
            var8 = document;
        } finally {
            if (isr != null) {
                isr.close();
            }

        }

        return var8;
    }

    public static String transFormXsl(String xml, String xsl, Map<String, String> map) {
        StringWriter writer = new StringWriter();

        try {
            StringReader xmlReader = new StringReader(xml);
            StringReader xslReader = new StringReader(xsl);
            System.setProperty("javax.xml.transform.TransformerFactory", "org.apache.xalan.processor.TransformerFactoryImpl");
            TransformerFactory factory = TransformerFactory.newInstance();
            factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            Transformer transformer = factory.newTransformer(new StreamSource(xslReader));
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            if (map != null) {
                Iterator it = map.entrySet().iterator();

                while(it.hasNext()) {
                    Entry<String, String> obj = (Entry)it.next();
                    transformer.setParameter((String)obj.getKey(), obj.getValue());
                }
            }

            StreamSource xmlSource = new StreamSource(xmlReader);
            Result result = new StreamResult(writer);
            transformer.transform(xmlSource, result);
        } catch (TransformerException e) {
            logger.error("transform xsl error:{}", e.getMessage());
        }

        return writer.toString();
    }

    public static String transXmlByXslt(String xml, String xslPath, Map<String, String> map) {
        Document document = loadXml(xml);
        if (ObjectUtils.isEmpty(document)) {
            return "";
        } else {
            document.setXMLEncoding("UTF-8");
            Document result = styleDocument(document, xslPath, map);
            return docToString(result);
        }
    }

    public static String transXmlByXslt(String xml, InputStream styleStream, Map<String, String> map) {
        Document document = loadXml(xml);
        if (ObjectUtils.isEmpty(document)) {
            return "";
        } else {
            document.setXMLEncoding("UTF-8");
            Document result = styleDocument(document, styleStream, map);
            return docToString(result);
        }
    }

    public static String transFileXmlByXslt(String xmlPath, String xslPath, Map<String, String> map) {
        Document document = load(xmlPath);
        if (ObjectUtils.isEmpty(document)) {
            return "";
        } else {
            document.setXMLEncoding("UTF-8");
            Document result = styleDocument(document, xslPath, map);
            return docToString(result);
        }
    }

    public static String docToString(Document document) {
        String s = "";
        ByteArrayOutputStream out = null;
        XMLWriter writer = null;

        try {
            out = new ByteArrayOutputStream();
            OutputFormat format = new OutputFormat("  ", true, "UTF-8");
            writer = new XMLWriter(out, format);
            writer.write(document);
            s = out.toString("UTF-8");
        } catch (Exception var13) {
            logger.error("docToString error:{}", var13.getMessage());
        } finally {
            try {
                if (out != null) {
                    out.close();
                }

                if (writer != null) {
                    writer.close();
                }
            } catch (IOException var12) {
                ;
            }

        }

        return s;
    }

    public static String docToPrettyString(Document document) {
        String s = "";
        Writer writer = null;
        XMLWriter xmlWriter = null;

        try {
            writer = new StringWriter();
            OutputFormat format = OutputFormat.createPrettyPrint();
            format.setSuppressDeclaration(true);
            xmlWriter = new XMLWriter(writer, format);
            xmlWriter.write(document);
            s = writer.toString();
        } catch (Exception var13) {
            logger.error("docToString error:{}", var13.getMessage());
        } finally {
            try {
                if (xmlWriter != null) {
                    xmlWriter.close();
                }

                if (writer != null) {
                    writer.close();
                }
            } catch (IOException ioe) {
                logger.error("docToString error:{}", ioe.getMessage());
            }

        }

        return s;
    }

    public static Document styleDocument(Document document, String stylesheet, Map<String, String> map) {
        Document transformedDoc = null;
        try {
            System.setProperty("javax.xml.transform.TransformerFactory", "org.apache.xalan.processor.TransformerFactoryImpl");
            TransformerFactory factory = TransformerFactory.newInstance();
            factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);

            Transformer transformer = factory.newTransformer(new StreamSource(stylesheet));
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            if (map != null) {
                Iterator it = map.entrySet().iterator();

                while(it.hasNext()) {
                    Entry<String, String> obj = (Entry)it.next();
                    transformer.setParameter((String)obj.getKey(), obj.getValue());
                }
            }

            DocumentSource source = new DocumentSource(document);
            DocumentResult result = new DocumentResult();
            transformer.transform(source, result);
            transformedDoc = result.getDocument();
        } catch (TransformerException e) {
            logger.error("styleDocument error:{}", e.getMessage());
        }
        return transformedDoc;
    }

    public static Document styleDocument(Document document, InputStream stylesheetStream, Map<String, String> map) {
        Document transformedDoc = null;

        try {
            System.setProperty("javax.xml.transform.TransformerFactory", "org.apache.xalan.processor.TransformerFactoryImpl");
            TransformerFactory factory = TransformerFactory.newInstance();
            factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            Transformer transformer = factory.newTransformer(new StreamSource(stylesheetStream));
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            if (map != null) {
                Iterator it = map.entrySet().iterator();

                while(it.hasNext()) {
                    Entry<String, String> obj = (Entry)it.next();
                    transformer.setParameter(obj.getKey(), obj.getValue());
                }
            }

            DocumentSource source = new DocumentSource(document);
            DocumentResult result = new DocumentResult();
            transformer.transform(source, result);
            transformedDoc = result.getDocument();
        } catch (TransformerException e) {
            logger.error("styleDocument error:{}", e.getMessage());
        }
        return transformedDoc;
    }

    public static boolean validateXMLSchema(String xml, File... xsdFiles) {
        return validateXMLSchema((InputStream)(new ByteArrayInputStream(xml.getBytes())), (File[])xsdFiles);
    }

    public static boolean validateXMLSchema(InputStream xmlIs, File... xsdFiles) {
        try {
            SchemaFactory factory = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
            List<Source> sourceList = new ArrayList();
            File[] var7 = xsdFiles;
            int var6 = xsdFiles.length;

            for(int var5 = 0; var5 < var6; ++var5) {
                File file = var7[var5];
                sourceList.add(new StreamSource(file));
            }

            Source[] sources = (Source[])sourceList.toArray(new Source[0]);
            Schema schema = factory.newSchema(sources);
            Validator validator = schema.newValidator();
            validator.validate(new StreamSource(xmlIs));
            return true;
        } catch (SAXException | IOException var8) {
            logger.error("validate XML File error:{}", var8.getMessage());
            return false;
        }
    }

    public static boolean validateXMLSchema(InputStream xmlIs, InputStream... xsdIses) {
        try {
            SchemaFactory factory = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
            List<Source> sourceList = new ArrayList();
            InputStream[] var7 = xsdIses;
            int var6 = xsdIses.length;

            for(int var5 = 0; var5 < var6; ++var5) {
                InputStream xsdIs = var7[var5];
                sourceList.add(new StreamSource(xsdIs));
            }

            Source[] sources = (Source[])sourceList.toArray(new Source[0]);
            Schema schema = factory.newSchema(sources);
            Validator validator = schema.newValidator();
            validator.validate(new StreamSource(xmlIs));
            return true;
        } catch (SAXException | IOException var8) {
            logger.error("validate XML File error:{}", var8.getMessage());
            return false;
        }
    }

    public static List<Element> elements(Element element, String targetName) {
        List<Element> result = new ArrayList();
        List<Element> elems = element.elements();
        Element elm = null;
        if (ObjectUtils.isNotEmpty(elems)) {
            Iterator it = elems.iterator();

            while(it.hasNext()) {
                elm = (Element)it.next();
                if (targetName.equalsIgnoreCase(elm.getName())) {
                    result.add(elm);
                } else {
                    result.addAll(elements(elm, targetName));
                }
            }
        }

        return result;
    }

    public static List<Element> elements(Document element, String targetName) {
        return elements(element.getRootElement(), targetName);
    }

    public static String getString(Element element, String attrName) {
        return getString(element, attrName, false);
    }

    public static String getString(Element element, String attrName, Boolean fuzzy) {
        if (element == null) {
            return null;
        } else {
            String val = element.attributeValue(attrName);
            if (StringUtils.isEmpty(val)) {
                return null;
            } else {
                if (fuzzy) {
                    val = "%" + val + "%";
                }

                return val;
            }
        }
    }

    public static String readXml(String url, String charsetName) {
        SAXReader reader = new SAXReader();
        reader.setEncoding(charsetName);
        Document document = null;

        try {
            document = reader.read(url);
        } catch (DocumentException var5) {
            logger.error("read XML File error:{}", var5.getMessage());
        }

        return document == null ? "" : document.asXML();
    }

    public static void writerXml(String xml, String charsetName, String path) {
        XMLWriter xmlWriter = null;

        try {
            OutputFormat format = OutputFormat.createPrettyPrint();
            format.setEncoding(charsetName);
            xmlWriter = new XMLWriter(new FileOutputStream(path), format);
            Document doc = DocumentHelper.parseText(xml);
            xmlWriter.write(doc);
        } catch (Exception var14) {
            logger.error("write XML File error:{}", var14.getMessage());
        } finally {
            try {
                if (xmlWriter != null) {
                    xmlWriter.close();
                }
            } catch (IOException e) {
                logger.error("write XML File error:{}", e.getMessage());
            }

        }

    }
}

