<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" units="mm" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" xmlns:se="http://www.opengis.net/se">
  <NamedLayer>
    <se:Name>tuberia</se:Name>
    <UserStyle>
      <se:Name>tuberia</se:Name>
      <se:FeatureTypeStyle>
        <se:Rule>
          <se:Name>&lt;75</se:Name>
          <se:Description>
            <se:Title>&lt;75</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:And>
                <ogc:PropertyIsGreaterThan>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>0</ogc:Literal>
                </ogc:PropertyIsGreaterThan>
                <ogc:PropertyIsLessThanOrEqualTo>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>74</ogc:Literal>
                </ogc:PropertyIsLessThanOrEqualTo>
              </ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>estado_servicio</ogc:PropertyName>
                <ogc:Literal>en_servicio</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:LineSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
            <se:Stroke>
              <se:SvgParameter name="stroke">#ecdb1e</se:SvgParameter>
              <se:SvgParameter name="stroke-width">0.3</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
              <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
            </se:Stroke>
          </se:LineSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>75 &lt;90</se:Name>
          <se:Description>
            <se:Title>75 &lt;90</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:And>
                <ogc:PropertyIsGreaterThan>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>74</ogc:Literal>
                </ogc:PropertyIsGreaterThan>
                <ogc:PropertyIsLessThanOrEqualTo>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>90</ogc:Literal>
                </ogc:PropertyIsLessThanOrEqualTo>
              </ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>estado_servicio</ogc:PropertyName>
                <ogc:Literal>en_servicio</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:LineSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
            <se:Stroke>
              <se:SvgParameter name="stroke">#3c5be7</se:SvgParameter>
              <se:SvgParameter name="stroke-width">0.3</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
              <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
            </se:Stroke>
          </se:LineSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>90 &lt;110</se:Name>
          <se:Description>
            <se:Title>90 &lt;110</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:And>
                <ogc:PropertyIsGreaterThan>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>90</ogc:Literal>
                </ogc:PropertyIsGreaterThan>
                <ogc:PropertyIsLessThanOrEqualTo>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>110</ogc:Literal>
                </ogc:PropertyIsLessThanOrEqualTo>
              </ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>estado_servicio</ogc:PropertyName>
                <ogc:Literal>en_servicio</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:LineSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
            <se:Stroke>
              <se:SvgParameter name="stroke">#eb0d11</se:SvgParameter>
              <se:SvgParameter name="stroke-width">0.3</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
              <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
            </se:Stroke>
          </se:LineSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>110 &lt;175</se:Name>
          <se:Description>
            <se:Title>110 &lt;175</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:And>
                <ogc:PropertyIsGreaterThan>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>110</ogc:Literal>
                </ogc:PropertyIsGreaterThan>
                <ogc:PropertyIsLessThanOrEqualTo>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>175</ogc:Literal>
                </ogc:PropertyIsLessThanOrEqualTo>
              </ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>estado_servicio</ogc:PropertyName>
                <ogc:Literal>en_servicio</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:LineSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
            <se:Stroke>
              <se:SvgParameter name="stroke">#16f030</se:SvgParameter>
              <se:SvgParameter name="stroke-width">0.3</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
              <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
            </se:Stroke>
          </se:LineSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>175 &lt;250</se:Name>
          <se:Description>
            <se:Title>175 &lt;250</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:And>
                <ogc:PropertyIsGreaterThan>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>175</ogc:Literal>
                </ogc:PropertyIsGreaterThan>
                <ogc:PropertyIsLessThanOrEqualTo>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>250</ogc:Literal>
                </ogc:PropertyIsLessThanOrEqualTo>
              </ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>estado_servicio</ogc:PropertyName>
                <ogc:Literal>en_servicio</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:LineSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
            <se:Stroke>
              <se:SvgParameter name="stroke">#33a02c</se:SvgParameter>
              <se:SvgParameter name="stroke-width">0.3</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
              <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
            </se:Stroke>
          </se:LineSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>250 &lt;400</se:Name>
          <se:Description>
            <se:Title>250 &lt;400</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:And>
                <ogc:PropertyIsGreaterThan>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>250</ogc:Literal>
                </ogc:PropertyIsGreaterThan>
                <ogc:PropertyIsLessThanOrEqualTo>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>400</ogc:Literal>
                </ogc:PropertyIsLessThanOrEqualTo>
              </ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>estado_servicio</ogc:PropertyName>
                <ogc:Literal>en_servicio</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:LineSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
            <se:Stroke>
              <se:SvgParameter name="stroke">#ad29dd</se:SvgParameter>
              <se:SvgParameter name="stroke-width">0.3</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
              <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
            </se:Stroke>
          </se:LineSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>400 a 600</se:Name>
          <se:Description>
            <se:Title>400 a 600</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:And>
                <ogc:PropertyIsGreaterThan>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>400</ogc:Literal>
                </ogc:PropertyIsGreaterThan>
                <ogc:PropertyIsLessThanOrEqualTo>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>600</ogc:Literal>
                </ogc:PropertyIsLessThanOrEqualTo>
              </ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>estado_servicio</ogc:PropertyName>
                <ogc:Literal>en_servicio</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:LineSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
            <se:Stroke>
              <se:SvgParameter name="stroke">#000000</se:SvgParameter>
              <se:SvgParameter name="stroke-width">0.3</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
              <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
            </se:Stroke>
          </se:LineSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>>600</se:Name>
          <se:Description>
            <se:Title>>600</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:And>
              <ogc:And>
                <ogc:PropertyIsGreaterThan>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>600</ogc:Literal>
                </ogc:PropertyIsGreaterThan>
                <ogc:PropertyIsLessThanOrEqualTo>
                  <ogc:PropertyName>diametro_equivalente</ogc:PropertyName>
                  <ogc:Literal>2500</ogc:Literal>
                </ogc:PropertyIsLessThanOrEqualTo>
              </ogc:And>
              <ogc:PropertyIsEqualTo>
                <ogc:PropertyName>estado_servicio</ogc:PropertyName>
                <ogc:Literal>en_servicio</ogc:Literal>
              </ogc:PropertyIsEqualTo>
            </ogc:And>
          </ogc:Filter>
          <se:MinScaleDenominator>1</se:MinScaleDenominator>
          <se:LineSymbolizer uom="http://www.opengeospatial.org/se/units/metre">
            <se:Stroke>
              <se:SvgParameter name="stroke">#d58d08</se:SvgParameter>
              <se:SvgParameter name="stroke-width">0.3</se:SvgParameter>
              <se:SvgParameter name="stroke-linejoin">bevel</se:SvgParameter>
              <se:SvgParameter name="stroke-linecap">square</se:SvgParameter>
            </se:Stroke>
          </se:LineSymbolizer>
        </se:Rule>
      </se:FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
