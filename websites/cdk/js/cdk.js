/* ------------------ Check Browser ------------------ */
function mybrowser() {
    isOpera = !!(window.opera && window.opera.version); // Opera 8.0+
    isFirefox = testCSS('MozBoxSizing'); // FF 0.8+
    isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
    isChrome = !isSafari && testCSS('WebkitTransform'); // Chrome 1+
    //var isIE = /*@cc_on!@*/false || testCSS('msTransform');  // At least IE6

    function testCSS(prop) {
        return prop in document.documentElement.style;
    }

    if (isOpera) {

        return false;

    } else if (isSafari || isChrome) {

        return true;

    } else {

        return false;

    }

}

function randomJSONObjN(n) {
    var result = "[";
    for (var i = 0; i < n; i++) {
        if (i == n - 1) {
            result += Math.floor(Math.random() * 100) + "]";
        } else {
            result += Math.floor(Math.random() * 100) + ",";
        }
    }
    return JSON.parse(result);
}
    /* ------------------ Window onload ------------------ */
window.onload = init;

function init() {
    initCSS();
    initChart();
    initSimpleDropdown();
    accordionDropdown();
    limitChoose();
    initFullBlockBlock();
    instantPreview();
    chevron();
    allSelectorCheckbox();
    initTab();
}
window.onresize = onResize;

function onResize() {
    initFullBlockBlock();
    initChart();
}

/* ------------------ Init CSS ------------------ */
function initCSS() {
    if (!mybrowser()) {
        var inputPrepends = document.getElementsByClassName("input-prepend");
        if (inputPrepends.length < 1)
            return;
        for (var i = 0; i < inputPrepends.length; i++) {
            var inputs = inputPrepends[i].getElementsByTagName("input");
            if (inputs.length < 1)
                return;
            for (var j = 0; j < inputs.length; j++) {
                inputs[j].style.paddingBottom = 2 + "px";
                inputs[j].style.paddingTop = 0 + "px";
            }
        }
    }
}


/* ------------------simple dropdown------------------ */
function initSimpleDropdown() {

    var dropdownsToggles = document.getElementsByClassName("dropdown");
    for (var i = 0; i < dropdownsToggles.length; i++) {
        if (!isDropdownToggle(dropdownsToggles[i])) {
            continue;
        }
        dropdownsToggles[i].onclick = function () {
            var dropdownMenus = this.getElementsByClassName("dropdown-menu");
            if (dropdownMenus.length > 0) {
                toggle(this, dropdownMenus);
            }
        };
    }

    function toggleDropdown(dropdownMenus, operate) {
        for (var j = 0; j < dropdownMenus.length; j++) {
            dropdownMenus[j].style.display = operate;
        }
    }

    function toggle(target, dropdownMenus) {
        if (isOpen(target)) {
            target.className = target.className.replace("open", "");
            toggleDropdown(dropdownMenus, "none");
        } else {
            target.className = target.className + " " + "open";
            toggleDropdown(dropdownMenus, "inline-block");
        }
    }


}


/*------------------accordion dropdown------------------*/
function accordionDropdown() {
    var accordionDropdowns = document.getElementsByClassName("accordion-dropdown");
    for (var i = 0; i < accordionDropdowns.length; i++) {
        if (!isDropdownToggle(accordionDropdowns[i])) {
            continue;
        }

        initDisplay(accordionDropdowns[i]);

        accordionDropdowns[i].onclick = function () {
            var uls = this.getElementsByTagName("ul");
            if (uls.length > 0) {

                toggle(this, uls);
            }
        }
    }

    function toggleDropdown(dropdownMenus, operate) {
        for (var j = 0; j < dropdownMenus.length; j++) {
            dropdownMenus[j].style.height = operate;
        }
    }

    function toggle(target, dropdownMenus) {
        var subElements = dropdownMenus[0].getElementsByTagName("li");
        var totalExpandHeight = subElements[0].offsetHeight * subElements.length;
        if (isOpen(target)) {
            target.className = target.className.replace("open", "");
            toggleDropdown(dropdownMenus, "0px");
        } else {
            target.className = target.className + " " + "open";
            toggleDropdown(dropdownMenus, totalExpandHeight.toString() + "px");
        }
    }

    function initDisplay(dropdown) {
        var dropdownMenus = dropdown.getElementsByTagName("ul");
        var subElements = dropdownMenus[0].getElementsByTagName("li");
        var totalExpandHeight = subElements[0].offsetHeight * subElements.length;
        if (dropdown.className.indexOf("open") > -1) {
            toggleDropdown(dropdownMenus, totalExpandHeight.toString() + "px");
        }
    }
}

function isDropdownToggle(toggle) {
    if (toggle.attributes["data-toggle"].value == "dropdown") {
        return true;
    }
    return false;
}

function isOpen(dropdownNode) {
    if (dropdownNode.className.indexOf("open") > -1) {
        return true;
    }
    return false;
}



/*------------------limit choose ------------------*/
function limitChoose() {
    var limitChooses = document.getElementsByClassName("limit-choose");
    if (limitChooses.length > 0) {
        for (var i = 0; i < limitChooses.length; i++) {
            var selects = limitChooses[i].getElementsByTagName("select");
            if (selects.length > 0) {
                for (var j = 0; j < selects.length; j++) {
                    // bind onclick
                    selects[j].onchange = function () {
                        if (isLimited(this)) {
                            limitTarget(this);
                        } else {
                            removeDisabled(this);
                        }
                    }
                }
            }
        }
    }


    function getTargetElement(select) {
        var target = select.attributes["data-limit-target"].value,
            targetElements = document.getElementsByClassName(target);
        return targetElements;
    }

    function limitTarget(select) {

        var targetElements = getTargetElement(select);
        for (var i = 0; i < targetElements.length; i++) {
            targetElements[i].className = targetElements[i].className + " " + "disabled";
            targetElements[i].setAttribute("disabled", "");
        }
    }

    function removeDisabled(select) {
        var targetElements = getTargetElement(select);
        for (var i = 0; i < targetElements.length; i++) {
            if (isDisabled(targetElements[i])) {
                targetElements[i].removeAttribute("disabled");
                targetElements[i].className = targetElements[i].className.replace("disabled", "");
            }
        }
    }

    function isDisabled(targetElement) {
        return targetElement.className.indexOf("disabled") > -1;
    }

    function isLimited(select) {
        var currentOpt = select.options[select.selectedIndex];
        if (currentOpt.attributes["data-limit"]) {
            return true;
        }
        return false;
    }
}

/*------------------Preview Block------------------*/
function initFullBlockBlock() {
    if (!document.getElementById("full-block")) return;
    var fullBlockHeight = document.getElementById("full-block").offsetHeight,
        browserHeight = document.documentElement.clientHeight,
        bodyHeight = document.getElementsByTagName("body")[0].offsetHeight;
    bodyBlockHeight = (browserHeight - bodyHeight + fullBlockHeight).toString() + "px";
    document.getElementById("full-block").style.height = bodyBlockHeight;

}   

/*------------------Instant Preview------------------*/
function instantPreview() {
    if (!document.getElementById("select-preview")) return;
    var selectPreview = document.getElementById("select-preview"),
        previewDiv = document.getElementById("full-block");
    //bind onchange event
    selectPreview.onchange = function () {
        //get selected opt
        var selectedOpt = selectPreview.options[selectPreview.selectedIndex],
            codeType = selectedOpt.attributes["value"].value;
        var code = codePic(codeType);
        previewDiv.innerHTML = previewDiv.innerHTML + code;
    }
}

/*------------------ Chevron ------------------*/
function chevron() {
    var btnMinimizes = document.getElementsByClassName("btn-minimize");
    if (btnMinimizes.length < 0) return;

    for (var i = 0; i < btnMinimizes.length; i++) {
        var btnMin = btnMinimizes[i];
        btnMin.onclick = function () {
            var target = this.parentNode.parentNode.parentNode.getElementsByClassName("box-content")[0];
            if (target.style.display !== "none") {
                target.style.display = "none";
                this.getElementsByTagName("i")[0].className = this.getElementsByTagName("i")[0].className.replace("chevron-up", "chevron-down");
            } else {
                target.style.display = "";
                this.getElementsByTagName("i")[0].className = this.getElementsByTagName("i")[0].className.replace("chevron-down", "chevron-up");
            }
            //        screen full
            initFullBlockBlock();
        }
    }
}

/*------------------ All Selector Checkbox ------------------*/
function allSelectorCheckbox() {
    var allSelectors = document.getElementsByClassName("all-selector-checkbox");
    if (allSelectors.length < 0) return;

    for (var i = 0; i < allSelectors.length; i++) {
        var selector = allSelectors[i];
        selector.onchange = function () {
            var targets = this.parentNode.parentNode.parentNode.parentNode,
                targets = targets.getElementsByTagName("input");
            targets = getCheckbox(targets);
            if (selector.checked) {
                operateAll(targets, true);
            } else {
                operateAll(targets, false);
            }
        }
    }

    function operateAll(checkboxs, operate) {
        for (var i = 0; i < checkboxs.length; i++) {
            checkboxs[i].checked = operate;
        }
    }

    function getCheckbox(inputs) {
        var checkboxs = new Array();
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].attributes["type"].value === "checkbox") {
                checkboxs.push(inputs[i]);
            }
        }
        return checkboxs;
    }

}

/*------------------ All Selector Checkbox ------------------*/
function initTab() {
    if (!document.getElementById("comment-tab")) return;
    var aTags = document.getElementById("comment-tab").getElementsByTagName("a");
    if (aTags.length < 0) return;

    for (var i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function () {
            if (this.parentNode.className.indexOf("active") > -1) return;
            var tmpATags = document.getElementById("comment-tab").getElementsByTagName("a"),
                targetId = this.attributes["href"].value.replace("#", "");
            for (var j = 0; j < tmpATags.length; j++) {
                display(this, tmpATags[j]);
            }
            return false;
        }
    }

    function display(targetATag, tmpATag) {
        var targetId = targetATag.attributes["href"].value.replace("#", ""),
            tmpId = tmpATag.attributes["href"].value.replace("#", "");
        if (targetId === tmpId) {
            //            if(targetATag.parentNode.className.indexOf("active") < 0){
            targetATag.parentNode.className = targetATag.parentNode.className + " " + "active";
            document.getElementById(targetId).style.display = "block";
            //            }
        } else {
            tmpATag.parentNode.className = tmpATag.parentNode.className.replace("active", "");
            document.getElementById(tmpId).style.display = "none";
        }
    }
}

/*------------------ Chart ------------------*/
function initChart() {
    //    funciont name == html id
    line();
    map();
    bar();
    sexProportion();
    ageDistribution();
    degreeDistribution();
    occupationDistribution();
    productSoldBar();
}

function requireConfig() {
    require.config({
        paths: {
            echarts: '../js'
        }
    });

    //    require(
    //            [
    //                'echarts',
    //                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
    //            ],
    //        function (ec) {
    //            // 基于准备好的dom，初始化echarts图表
    //            var myChart = ec.init(document.getElementById('bar'));
    //            var option =
    //
    //            // 为echarts对象加载数据 
    //            myChart.setOption(option);
    //        }
    //    );
}

function sexProportion() {
    if (!document.getElementById('sex-proportion')) return;
    requireConfig();

    require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('sex-proportion'));
            var option = {
                title: {
                    text: '性别比例',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['女', '男']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.01]

        }
    ],
                yAxis: [
                    {
                        type: 'category',
                        data: ['性别']
        }
    ],
                series: [
                    {
                        name: '女',
                        type: 'bar',
                        data: randomJSONObjN(6)
        },
                    {
                        name: '男',
                        type: 'bar',
                        data: randomJSONObjN(6)
        }
    ]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}

function ageDistribution() {
    if (!document.getElementById('age-distribution')) return;
    requireConfig();

    require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('age-distribution'));
            var option = {
                title: {
                    text: '年龄分布',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.01]

        }
    ],
                yAxis: [
                    {
                        type: 'category',
                        data: ['10-19岁', '20-29岁', '30-39岁', '40-49岁', '50-59岁']
        }
    ],
                series: [
                    {
                        name: '年龄统计百分比：',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                          '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                           '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                           '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}\n{c}'
                                }
                            }
                        },
                        data: randomJSONObjN(5)
        }
    ]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}

function degreeDistribution() {
    if (!document.getElementById('degree-distribution')) return;
    requireConfig();

    require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('degree-distribution'));
            var option = {
                title: {
                    text: '学历分布',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: []
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'value',
                        boundaryGap: [0, 0.01]

        }
    ],
                yAxis: [
                    {
                        type: 'category',
                        data: ['小学', '初中', '高中', '大专', '本科及以上']
        }
    ],
                series: [
                    {
                        name: '年龄统计百分比：',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                          '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                           '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                           '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'right',
                                    formatter: '{b}\n{c}'
                                }
                            }
                        },
                        data: randomJSONObjN(5)
        }
    ]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}

function occupationDistribution() {
    if (!document.getElementById('occupation-distribution')) return;
    requireConfig();

    require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('occupation-distribution'));
            var option = {
                title: {
                    x: 'center',
                    text: '职业分布',
                },
                tooltip: {
                    trigger: 'item'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                grid: {
                    borderWidth: 0,
                    y: 80,
                    y2: 60
                },
                xAxis: [
                    {
                        type: 'category',
                        show: false,
                        data: ['IT','营销公关','教育/学生','电信/网络','医疗/保健','服务','金融/房产','建筑','旅游交通','政府公共服务']
        }
    ],
                yAxis: [
                    {
                        type: 'value',
                        show: false
        }
    ],
                series: [
                    {
                        name: '职业分布',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                          '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                           '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                           '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter: '{b}\n{c}'
                                }
                            }
                        },
                        data: randomJSONObjN(10)
        }
    ]
            };

            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}


function bar() {
    if (!document.getElementById('bar')) return;
    requireConfig();

    require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('bar'));
            var option = {
                title: {
                    text: '浏览器使用情况',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    selected: {
                        'IE9': false,
                        'IE8': false,
                        'IE7': false,
                        'IE6': false
                    },
                    data: ['Chrome', 'Firefox', 'IE11', 'IE9', 'IE8', 'IE7', 'IE6']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ]
        }
    ],
                yAxis: [
                    {
                        type: 'value'
        }
    ],
                series: [
                    {
                        name: 'Chrome',
                        type: 'bar',
                        data: randomJSONObjN(12),
                        markPoint: {
                            data: [
                                {
                                    type: 'max',
                                    name: '最大值'
                                },
                                {
                                    type: 'min',
                                    name: '最小值'
                                }
                ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值'
                                }
                ]
                        }
        },
                    {
                        name: 'Firefox',
                        type: 'bar',
                        data: randomJSONObjN(12),
                        markPoint: {
                            data: [
                                {
                                    name: '年最高',
                                    value: Math.floor(Math.random() * 10 + 91),
                                    xAxis: Math.random() * 12,
                                    yAxis: 100,
                                    symbolSize: 18
                                },
                                {
                                    name: '年最低',
                                    value: Math.floor(Math.random() * 21),
                                    xAxis: Math.random() * 12,
                                    yAxis: 3
                                }
                ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值'
                                }
                ]
                        }
        },
                    {
                        name: 'IE11',
                        type: 'bar',
                        data: randomJSONObjN(12),
                        markPoint: {
                            data: [
                                {
                                    name: '年最高',
                                    value: Math.floor(Math.random() * 10 + 91),
                                    xAxis: Math.random() * 12,
                                    yAxis: 183,
                                    symbolSize: 18
                                },
                                {
                                    name: '年最低',
                                    value: Math.floor(Math.random() * 21),
                                    xAxis: Math.random() * 12,
                                    yAxis: 3
                                }
                ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值'
                                }
                ]
                        }
        },
                    {
                        name: 'IE9',
                        type: 'bar',
                        data: randomJSONObjN(12),
                        markPoint: {
                            data: [
                                {
                                    name: '年最高',
                                    value: Math.floor(Math.random() * 10 + 91),
                                    xAxis: Math.random() * 12,
                                    yAxis: 183,
                                    symbolSize: 18
                                },
                                {
                                    name: '年最低',
                                    value: Math.floor(Math.random() * 21),
                                    xAxis: Math.random() * 12,
                                    yAxis: 3
                                }
                ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值'
                                }
                ]
                        }
        },
                    {
                        name: 'IE8',
                        type: 'bar',
                        data: randomJSONObjN(12),
                        markPoint: {
                            data: [
                                {
                                    name: '年最高',
                                    value: Math.floor(Math.random() * 10 + 91),
                                    xAxis: Math.random() * 12,
                                    yAxis: 183,
                                    symbolSize: 18
                                },
                                {
                                    name: '年最低',
                                    value: Math.floor(Math.random() * 21),
                                    xAxis: Math.random() * 12,
                                    yAxis: 3
                                }
                ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值'
                                }
                ]
                        }
        },
                    {
                        name: 'IE7',
                        type: 'bar',
                        data: randomJSONObjN(12),
                        markPoint: {
                            data: [
                                {
                                    name: '年最高',
                                    value: Math.floor(Math.random() * 10 + 91),
                                    xAxis: Math.random() * 12,
                                    yAxis: 183,
                                    symbolSize: 18
                                },
                                {
                                    name: '年最低',
                                    value: Math.floor(Math.random() * 21),
                                    xAxis: Math.random() * 12,
                                    yAxis: 3
                                }
                ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值'
                                }
                ]
                        }
        },
                    {
                        name: 'IE6',
                        type: 'bar',
                        data: randomJSONObjN(12),
                        markPoint: {
                            data: [
                                {
                                    name: '年最高',
                                    value: Math.floor(Math.random() * 10 + 91),
                                    xAxis: Math.random() * 12,
                                    yAxis: 183,
                                    symbolSize: 18
                                },
                                {
                                    name: '年最低',
                                    value: Math.floor(Math.random() * 21),
                                    xAxis: Math.random() * 12,
                                    yAxis: 3
                                }
                ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值'
                                }
                ]
                        }
        },
    ]
            };

            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}

function map() {
    if (!document.getElementById('map')) return;
    requireConfig();

    require(
            [
                'echarts',
                'echarts/chart/map' // 使用柱状图就加载bar模块，按需加载
            ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('map'));
            var option = {
                title: {
                    text: '地域分布',
                    x: 'left'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    //                    orient: 'vertical',
                    x: 'center',
                    selected: 　{
                        '访问次数': false,
                        '访客数(UV)': false,
                        '新访客数': false,
                        'IP数': false,
                        '转化次数': false
                    },
                    data: ['浏览量(PV)', '访问次数', '访客数(UV)', '新访客数', 'IP数', '转化次数']
                },
                dataRange: {
                    min: 0,
                    max: 2500,
                    x: 'left',
                    y: 'bottom',
                    text: ['高', '低'], // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                roamController: {
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series: [
                    {
                        name: '浏览量(PV)',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: '北京',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '天津',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '上海',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '重庆',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '河北',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '河南',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '云南',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '辽宁',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '黑龙江',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '湖南',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '安徽',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '山东',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '新疆',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '江苏',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '浙江',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '江西',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '湖北',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '广西',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '甘肃',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '山西',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '内蒙古',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '陕西',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '吉林',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '福建',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '贵州',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '广东',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '青海',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '西藏',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '四川',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '宁夏',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '海南',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '台湾',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '香港',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '澳门',
                                value: Math.round(Math.random() * 1000)
                            }
            ]
        },
                    {
                        name: '访问次数',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: '北京',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '天津',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '上海',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '重庆',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '河北',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '安徽',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '新疆',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '浙江',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '江西',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '山西',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '内蒙古',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '吉林',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '福建',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '广东',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '西藏',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '四川',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '宁夏',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '香港',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '澳门',
                                value: Math.round(Math.random() * 1000)
                            }
            ]
        },
                    {
                        name: '访客数(UV)',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: '北京',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '天津',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '上海',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '广东',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '台湾',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '香港',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '澳门',
                                value: Math.round(Math.random() * 1000)
                            }
            ]
        },
                    {
                        name: '新访客数',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: '北京',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '天津',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '上海',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '广东',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '台湾',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '香港',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '澳门',
                                value: Math.round(Math.random() * 1000)
                            }
            ]
        },
                    {
                        name: 'IP数',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: '北京',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '天津',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '上海',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '广东',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '台湾',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '香港',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '澳门',
                                value: Math.round(Math.random() * 1000)
                            }
            ]
        },
                    {
                        name: '转化次数',
                        type: 'map',
                        mapType: 'china',
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        data: [
                            {
                                name: '北京',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '天津',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '上海',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '广东',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '台湾',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '香港',
                                value: Math.round(Math.random() * 1000)
                            },
                            {
                                name: '澳门',
                                value: Math.round(Math.random() * 1000)
                            }
            ]
        },
    ]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}

function line() {
    if (!document.getElementById('main')) return;
    requireConfig();
    // 使用
    require(
            [
                'echarts',
                'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
            ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('main'));
            var option = {
                title: {
                    text: '数据统计',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    selected: {
                        '访客数(UV)': false,
                        'IP数': false,
                        '入口页次数': false,
                        '贡献下游浏览量': false,
                        '退出页次数': false,
                        '平均停留时长': false,
                        '退出率': false
                    },
                    data: ['浏览量', '访客数(UV)', 'IP数', '入口页次数', '贡献下游浏览量', '退出页次数', '平均停留时长', '退出率']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar', 'stack', 'tiled']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['2015-02-11', '2015-02-13', '2015-02-15', '2015-02-17', '2015-02-19', '2015-02-21', '2015-02-23', '2015-02-25', '2015-02-27', '2015-03-01', '2015-03-03', '2015-03-05', '2015-03-07', '2015-09', '2015-03-11', ]
        }
    ],
                yAxis: [
                    {
                        type: 'value'
        }
    ],
                series: [
                    {
                        name: '浏览量',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: randomJSONObjN(15)
                    },
                    {
                        name: '访客数(UV)',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: randomJSONObjN(15)
                    },
                    {
                        name: 'IP数',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: randomJSONObjN(15)
                    },
                    {
                        name: '入口页次数',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: randomJSONObjN(15)
                    },
                    {
                        name: '贡献下游浏览量',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: randomJSONObjN(15)
                    },
                    {
                        name: '退出页次数',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: randomJSONObjN(15)
                    },
                    {
                        name: '平均停留时长',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: randomJSONObjN(15)
                    },
                    {
                        name: '退出率',
                        type: 'line',
                        smooth: false,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data: randomJSONObjN(15)
                    },
    ]
            };
            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}

function productSoldBar(){
    if (!document.getElementById('product-sold-bar')) return;
    requireConfig();

    require(
            [
                'echarts',
                'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
            ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            var myChart = ec.init(document.getElementById('product-sold-bar'));
            var option = {
                title: {
                    text: '商品出售情况',
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['商品1']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', ]
        }
    ],
                yAxis: [
                    {
                        type: 'value'
        }
    ],
                series: [
                    {
                        name: '商品1',
                        type: 'bar',
                        data: randomJSONObjN(12),
                        markPoint: {
                            data: [
                                {
                                    type: 'max',
                                    name: '最大值'
                                },
                                {
                                    type: 'min',
                                    name: '最小值'
                                }
                ]
                        },
                        markLine: {
                            data: [
                                {
                                    type: 'average',
                                    name: '平均值'
                                }
                ]
                        }
                    }
    ]
            };

            // 为echarts对象加载数据 
            myChart.setOption(option);
        }
    );
}