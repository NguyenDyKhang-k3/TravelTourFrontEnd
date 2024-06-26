travel_app.controller('ChartControllerAD', function ($scope, $filter, $rootScope, $location, $timeout, $interval, RevenueServiceAD, RevenueServiceStaff, ToursTypeServiceAD) {

    const {merge: merge} = window._;
    const echartSetOption = (e, t, o, n) => {
        const {breakpoints: r, resize: a} = window.phoenix.utils, s = t => {
            Object.keys(t).forEach((o => {
                window.innerWidth > r[o] && e.setOption(t[o]);
            }));
        }, i = document.body;
        e.setOption(merge(o(), t));
        const c = document.querySelector(".navbar-vertical-toggle");
        c && c.addEventListener("navbar.vertical.toggle", (() => {
            e.resize(), n && s(n);
        })), a((() => {
            e.resize(), n && s(n);
        })), n && s(n), i.addEventListener("clickControl", (({detail: {control: n}}) => {
            "phoenixTheme" === n && e.setOption(window._.merge(o(), t));
        }));
    };

    const chartBarInit = async () => {
        const {getColor: t, getData: a, toggleColor: e} = window.phoenix.utils,
            r = document.querySelector(".echart-email-campaign-report"), o = (t, a = "MMM DD") => {
                const e = t[1],
                    r = `<div class='ms-1'>          
                                    <h6 class="text-700">
                                        <span class="fas fa-circle me-1 fs--2" style="color:${e.borderColor ? e.borderColor : e.color}"></span>
                                        ${e.axisValue} : ${$filter('vnCurrency')(("object" == typeof e.value ? e.value[1] : e.value))}
                                    </h6>
                               </div>`;
                return `<div><p class='mb-2 text-600'> ${e.seriesName} </p>${r}</div>`
            }, i = [0, 0, 0, 0], l = await columnChart(t);
        if (r) {
            const s = a(r, "echarts"), n = echarts.init(r);
            echartSetOption(n, s, (() => ({
                color: [t("primary"), t("gray-300")],
                tooltip: {
                    trigger: "axis",
                    padding: [7, 10],
                    backgroundColor: t("gray-100"),
                    borderColor: t("gray-300"),
                    textStyle: {color: t("dark")},
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {type: "none"},
                    formatter: o
                },
                xAxis: {
                    type: "category",
                    data: $scope.yearList,
                    splitLine: {show: !1},
                    axisLabel: {
                        color: t("gray-900"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 400,
                        fontSize: 12.8,
                        margin: 24,
                        rotate: 30
                    },
                    axisLine: {show: !0, lineStyle: {color: t("gray-300")}},
                    axisTick: !1
                },
                yAxis: {
                    type: 'value',
                    splitLine: {lineStyle: {color: t("gray-200")}},
                    axisLabel: {
                        color: t("gray-900"),
                        fontFamily: "Nunito Sans",
                        fontWeight: 700,
                        fontSize: 12.8,
                        margin: 24,
                        formatter: function (value) {
                            return formatNumberWithMillion(value);
                        },
                    },
                },

                series: [{
                    name: "Placeholder",
                    type: "bar",
                    barWidth: "64px",
                    stack: "Total",
                    backgroundColor: t("white"),
                    label: {show: !1},
                    itemStyle: {borderColor: "transparent", color: "transparent"},
                    emphasis: {itemStyle: {borderColor: "transparent", color: "transparent"}},
                    data: i
                }, {
                    name: "Doanh Thu Trong Năm",
                    type: "bar",
                    stack: "Total",
                    itemStyle: {color: t("primary-200")},
                    data: l,
                    label: {
                        show: !0,
                        position: "inside",
                        color: e(t("gray-1100"), t("gray-200")),
                        fontWeight: "normal",
                        fontSize: "12.8px",
                        formatter: function (params) {
                            return formatNumberWithMillion(params.value);
                        }
                    }
                }],
                grid: {right: "0", left: 6, bottom: 10, top: "5%", containLabel: !0},
                animation: !1
            })), {
                xs: {
                    series: [{barWidth: "48px"}],
                    xAxis: {axisLabel: {show: !0, formatter: t => `${t.slice(0, 5)}...`}}
                },
                sm: {
                    series: [{barWidth: "64px"}],
                    xAxis: {axisLabel: {show: !0, formatter: t => `${t.slice(0, 11)}`, rotate: 0}}
                },
                md: {series: [{barWidth: "56px"}], xAxis: {axisLabel: {show: !1}}},
                lg: {series: [{barWidth: "64px"}], xAxis: {axisLabel: {show: !0, formatter: t => `${t.slice(0, 11)}`}}}
            });
        }
    };

    const camelize = e => {
        const t = e.replace(/[-_\s.]+(.)?/g, ((e, t) => t ? t.toUpperCase() : ""));
        return `${t.substr(0, 1).toLowerCase()}${t.substr(1)}`
    };
    const getData = (e, t) => {
        try {
            return JSON.parse(e.dataset[camelize(t)])
        } catch (o) {
            return e.dataset[camelize(t)]
        }
    };

    const renderCalendar = (e, t) => {
        const {merge: r} = window._, a = r({
            initialView: "dayGridMonth",
            editable: !0,
            direction: document.querySelector("html").getAttribute("dir"),
            headerToolbar: {left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay"},
            buttonText: {month: "Month", week: "Week", day: "Day"}
        }, t), n = new window.FullCalendar.Calendar(e, a);
        return n.render(), document.querySelector(".navbar-vertical-toggle")?.addEventListener("navbar.vertical.toggle", (() => n.updateSize())), n
    };
    const fullCalendarInit = () => {
        const {getData: e} = window.phoenix.utils;
        document.querySelectorAll("[data-calendar]").forEach((t => {
            const r = e(t, "calendar");
            renderCalendar(t, r);
        }));
    };
    const fullCalendar = {renderCalendar: renderCalendar, fullCalendarInit: fullCalendarInit};

    const {dayjs: dayjs} = window, currentDay = dayjs && dayjs().format("DD"),
        currentMonth = dayjs && dayjs().format("MM"), prevMonth = dayjs && dayjs().subtract(1, "month").format("MM"),
        nextMonth = dayjs && dayjs().add(1, "month").format("MM"), currentYear = dayjs && dayjs().format("YYYY"),
        events = [{
            title: "Boot Camp",
            start: `${currentYear}-${currentMonth}-01 10:00:00`,
            end: `${currentYear}-${currentMonth}-03 16:00:00`,
            description: "Boston Harbor Now in partnership with the Friends of Christopher Columbus Park, the Wharf District Council and the City of Boston is proud to announce the New Year's Eve Midnight Harbor Fireworks! This beloved nearly 40-year old tradition is made possible by the generous support of local waterfront organizations and businesses and the support of the City of Boston and the Office of Mayor Marty Walsh.",
            className: "text-success",
            location: "Boston Harborwalk, Christopher Columbus Park, <br /> Boston, MA 02109, United States",
            organizer: "Boston Harbor Now"
        }, {
            title: "Crain's New York Business ",
            start: `${currentYear}-${currentMonth}-11`,
            description: "Crain's 2020 Hall of Fame. Sponsored Content By Crain's Content Studio. Crain's Content Studio Presents: New Jersey: Perfect for Business. Crain's Business Forum: Letitia James, New York State Attorney General. Crain's NYC Summit: Examining racial disparities during the pandemic",
            className: "text-primary"
        }, {
            title: "Conference",
            start: `${currentYear}-${currentMonth}-${currentDay}`,
            description: "The Milken Institute Global Conference gathered the best minds in the world to tackle some of its most stubborn challenges. It was a unique experience in which individuals with the power to enact change connected with experts who are reinventing health, technology, philanthropy, industry, and media.",
            className: "text-success",
            schedules: [{
                title: "Reporting",
                start: `${currentYear}-${currentMonth}-${currentDay} 11:00:00`,
                description: "Time to start the conference and will briefly describe all information about the event.  ",
                className: "text-success "
            }, {
                title: "Lunch",
                start: `${currentYear}-${currentMonth}-${currentDay} 14:00:00`,
                description: "Lunch facility for all the attendance in the conference.",
                className: "text-information"
            }, {
                title: "Contest",
                start: `${currentYear}-${currentMonth}-${currentDay} 16:00:00`,
                description: "The starting of the programming contest",
                className: "text-success"
            }, {
                title: "Dinner",
                start: `${currentYear}-${currentMonth}-${currentDay} 22:00:00`,
                description: "Dinner facility for all the attendance in the conference",
                className: "text-success"
            }]
        }, {
            title: `ICT Expo ${currentYear} - Product Release`,
            start: `${currentYear}-${currentMonth}-16 10:00:00`,
            description: `ICT Expo ${currentYear} is the largest private-sector exposition aimed at showcasing IT and ITES products and services in Switzerland.`,
            end: `${currentYear}-${currentMonth}-18 16:00:00`,
            className: "text-warning",
            allDay: !0
        }, {
            title: "Meeting",
            start: `${currentYear}-${currentMonth}-07 10:00:00`,
            description: "Discuss about the upcoming projects in current year and assign all tasks to the individuals",
            className: "text-information"
        }, {
            title: "Contest",
            start: `${currentYear}-${currentMonth}-14 10:00:00`,
            className: "text-information",
            description: "PeaceX is an international peace and amity organisation that aims at casting a pall at the striking issues surmounting the development of peoples and is committed to impacting the lives of young people all over the world."
        }, {
            title: "Event With Url",
            start: `${currentYear}-${currentMonth}-23`,
            description: "Sample example of a event with url. Click the event, will redirect to the given link.",
            className: "text-success",
            url: "http://google.com"
        }, {
            title: "Competition",
            start: `${currentYear}-${currentMonth}-26`,
            description: "The Future of Zambia – Top 30 Under 30 is an annual award, ranking scheme, and recognition platform for young Zambian achievers under the age of 30, who are building brands, creating jobs, changing the game, and transforming the country.",
            className: "text-danger"
        }, {
            title: "Birthday Party",
            start: `${currentYear}-${nextMonth}-05`,
            description: "Will celebrate birthday party with my friends and family",
            className: "text-primary"
        }, {
            title: "Click for Google",
            url: "http://google.com/",
            start: `${currentYear}-${prevMonth}-10`,
            description: "Applications are open for the New Media Writing Prize 2020. The New Media Writing Prize (NMWP) showcases exciting and inventive stories and poetry that integrate a letiety of formats, platforms, and digital media.",
            className: "text-primary"
        }];

    const getTemplate = n => `\n<div class="modal-header ps-card border-bottom">\n  <div>\n    <h4 class="modal-title text-1000 mb-0">${n.title}</h4>\n    ${n.extendedProps.organizer ? `<p class="mb-0 fs--1 mt-1">\n        by <a href="#!">${n.extendedProps.organizer}</a>\n      </p>` : ""}\n  </div>\n  <button type="button" class="btn p-1 fw-bolder" data-bs-dismiss="modal" aria-label="Close">\n    <span class='fas fa-times fs-0'></span>\n  </button>\n\n</div>\n\n<div class="modal-body px-card pb-card pt-1 fs--1">\n  ${n.extendedProps.description ? `\n      <div class="mt-3 border-bottom pb-3">\n        <h5 class='mb-0 text-800'>Description</h5>\n        <p class="mb-0 mt-2">\n          ${n.extendedProps.description.split(" ").slice(0, 30).join(" ")}\n        </p>\n      </div>\n    ` : ""} \n  <div class="mt-4 ${n.extendedProps.location ? "border-bottom pb-3" : ""}">\n    <h5 class='mb-0 text-800'>Date and Time</h5>\n    <p class="mb-1 mt-2">\n    ${window.dayjs && window.dayjs(n.start).format("dddd, MMMM D, YYYY, h:mm A")} \n    ${n.end ? `– ${window.dayjs && window.dayjs(n.end).subtract(1, "day").format("dddd, MMMM D, YYYY, h:mm A")}` : ""}\n  </p>\n\n  </div>\n  ${n.extendedProps.location ? `\n        <div class="mt-4 ">\n          <h5 class='mb-0 text-800'>Location</h5>\n          <p class="mb-0 mt-2">${n.extendedProps.location}</p>\n        </div>\n      ` : ""}\n  ${n.schedules ? `\n      <div class="mt-3">\n        <h5 class='mb-0 text-800'>Schedule</h5>\n        <ul class="list-unstyled timeline mt-2 mb-0">\n          ${n.schedules.map((n => `<li>${n.title}</li>`)).join("")}\n        </ul>\n      </div>\n      ` : ""}\n  </div>\n</div>\n\n<div class="modal-footer d-flex justify-content-end px-card pt-0 border-top-0">\n  <a href="#!" class="btn btn-phoenix-secondary btn-sm">\n    <span class="fas fa-pencil-alt fs--2 mr-2"></span> Edit\n  </a>\n  <button class="btn btn-phoenix-danger btn-sm" data-calendar-event-remove >\n    <span class="fa-solid fa-trash fs--1 mr-2" data-fa-transform="shrink-2"></span> Delete\n  </button>\n  <a href='#!' class="btn btn-primary btn-sm">\n    See more details\n    <span class="fas fa-angle-right fs--2 ml-1"></span>\n  </a>\n</div>\n`;

    const appCalendarInit = () => {
        const e = "#addEventForm", t = "#addEventModal", a = "#appCalendar", r = ".calendar-title", n = ".calendar-day",
            o = ".calendar-date", d = "[data-fc-view]", l = "data-event", c = "#eventDetailsModal",
            i = "#eventDetailsModal .modal-content", u = '#addEventModal [name="startDate"]', s = '[name="title"]',
            m = "shown.bs.modal", v = "submit", g = "event", y = "fc-view",
            p = events.reduce(((e, t) => t.schedules ? e.concat(t.schedules.concat(t)) : e.concat(t)), []);
        (() => {
            const e = new Date, t = e.toLocaleString("en-US", {month: "short"}), a = e.getDate(), r = e.getDay(),
                d = `${a}  ${t},  ${e.getFullYear()}`;
            document.querySelector(n) && (document.querySelector(n).textContent = (e => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][e])(r)), document.querySelector(o) && (document.querySelector(o).textContent = d);
        })();
        const h = e => {
                const {currentViewType: t} = e;
                if ("timeGridWeek" === t) {
                    const t = e.dateProfile.currentRange.start, a = t.toLocaleString("en-US", {month: "short"}),
                        n = t.getDate(), o = e.dateProfile.currentRange.end,
                        d = o.toLocaleString("en-US", {month: "short"}), l = o.getDate();
                    document.querySelector(r).textContent = `${a} ${n} - ${d} ${l}`;
                } else document.querySelector(r).textContent = e.viewTitle;
            }, w = document.querySelector(a), f = document.querySelector(e), D = document.querySelector(t),
            S = document.querySelector(c);
        if (w) {
            const e = fullCalendar.renderCalendar(w, {
                headerToolbar: !1,
                dayMaxEvents: 3,
                height: 800,
                stickyHeaderDates: !1,
                views: {week: {eventLimit: 3}},
                eventTimeFormat: {hour: "numeric", minute: "2-digit", omitZeroMinute: !0, meridiem: !0},
                events: p,
                eventClick: e => {
                    if (e.event.url) window.open(e.event.url, "_blank"), e.jsEvent.preventDefault(); else {
                        const t = getTemplate(e.event);
                        document.querySelector(i).innerHTML = t;
                        new window.bootstrap.Modal(S).show();
                    }
                },
                dateClick(e) {
                    new window.bootstrap.Modal(D).show();
                    document.querySelector(u)._flatpickr.setDate([e.dateStr]);
                }
            });
            h(e.currentData), document.addEventListener("click", (t => {
                if (t.target.hasAttribute(l) || t.target.parentNode.hasAttribute(l)) {
                    const a = t.target.hasAttribute(l) ? t.target : t.target.parentNode;
                    switch (getData(a, g)) {
                        case"prev":
                            e.prev(), h(e.currentData);
                            break;
                        case"next":
                            e.next(), h(e.currentData);
                            break;
                        default:
                            e.today(), h(e.currentData);
                    }
                }
                if (t.target.hasAttribute("data-fc-view")) {
                    const a = t.target;
                    e.changeView(getData(a, y)), h(e.currentData), document.querySelectorAll(d).forEach((e => {
                        e === t.target ? e.classList.add("active-view") : e.classList.remove("active-view");
                    }));
                }
            })), f && f.addEventListener(v, (t => {
                t.preventDefault();
                const {title: a, startDate: r, endDate: n, label: o, description: d, allDay: l} = t.target;
                e.addEvent({
                    title: a.value,
                    start: r.value,
                    end: n.value ? n.value : null,
                    allDay: l.checked,
                    className: `text-${o.value}`,
                    description: d.value
                }), t.target.reset(), window.bootstrap.Modal.getInstance(D).hide();
            })), D && D.addEventListener(m, (({currentTarget: e}) => {
                e.querySelector(s)?.focus();
            }));
        }
    };

    const tooltipFormatter = (params, dateFormatter = 'MMM DD') => {
        let tooltipItem = ``;
        params.forEach(el => {
            tooltipItem += `<div class='ms-1'>
        <h6 class="text-700"><span class="fas fa-circle me-1 fs--2" style="color:${
                el.borderColor ? el.borderColor : el.color
            }"></span>
          ${el.seriesName} : ${
                typeof el.value === 'object' ? el.value[1] : el.value
            }
        </h6>
      </div>`;
        });
        return `<div>
            <p class='mb-2 text-600'>
              ${
            window.dayjs(params[0].axisValue).isValid()
                ? window.dayjs(params[0].axisValue).format(dateFormatter)
                : params[0].axisValue
        }
            </p>
            ${tooltipItem}
          </div>`;
    };

    const handleTooltipPosition = ([pos, , dom, , size]) => {
        // only for mobile device
        if (window.innerWidth <= 540) {
            const tooltipHeight = dom.offsetHeight;
            const obj = {top: pos[1] - tooltipHeight - 20};
            obj[pos[0] < size.viewSize[0] / 2 ? 'left' : 'right'] = 5;
            return obj;
        }
        return null; // else default behaviour
    };
    const projectionVsActualChartInit = () => {
        const {getColor, getData, getPastDates} = window.phoenix.utils;
        const $projectionVsActualChartEl = document.querySelector(
            '.echart-projection-actual'
        );

        const dates = getPastDates(10);

        const data1 = [
            44485, 20428, 47302, 45180, 31034, 46358, 26581, 36628, 38219, 43256
        ];

        const data2 = [
            38911, 29452, 31894, 47876, 31302, 27731, 25490, 30355, 27176, 30393
        ];

        if ($projectionVsActualChartEl) {
            const userOptions = getData($projectionVsActualChartEl, 'echarts');
            const chart = window.echarts.init($projectionVsActualChartEl);

            const getDefaultOptions = () => ({
                color: [getColor('primary'), getColor('gray-300')],
                tooltip: {
                    trigger: 'axis',
                    padding: [7, 10],
                    backgroundColor: getColor('gray-100'),
                    borderColor: getColor('gray-300'),
                    textStyle: {color: getColor('dark')},
                    borderWidth: 1,
                    transitionDuration: 0,
                    axisPointer: {
                        type: 'none'
                    },
                    position: (...params) => handleTooltipPosition(params),
                    formatter: params => tooltipFormatter(params)
                },
                legend: {
                    data: ['Projected revenue', 'Actual revenue'],
                    right: 'right',
                    width: '100%',
                    itemWidth: 16,
                    itemHeight: 8,
                    itemGap: 20,
                    top: 3,
                    inactiveColor: getColor('gray-500'),
                    textStyle: {
                        color: getColor('gray-900'),
                        fontWeight: 600,
                        fontFamily: 'Nunito Sans'
                        // fontSize: '12.8px'
                    }
                },
                xAxis: {
                    type: 'category',
                    // boundaryGap: false,
                    axisLabel: {
                        color: getColor('gray-800'),
                        formatter: value => window.dayjs(value).format('MMM DD'),
                        interval: 3,
                        fontFamily: 'Nunito Sans',
                        fontWeight: 600,
                        fontSize: 12.8
                    },
                    data: dates,
                    axisLine: {
                        lineStyle: {
                            color: getColor('gray-300')
                        }
                    },
                    axisTick: false
                },
                yAxis: {
                    axisPointer: {type: 'none'},
                    // boundaryGap: false,
                    axisTick: 'none',
                    splitLine: {
                        interval: 5,
                        lineStyle: {
                            color: getColor('gray-200')
                        }
                    },
                    axisLine: {show: false},
                    axisLabel: {
                        fontFamily: 'Nunito Sans',
                        fontWeight: 600,
                        fontSize: 12.8,
                        color: getColor('gray-800'),
                        margin: 20,
                        verticalAlign: 'bottom',
                        formatter: value => `$${value.toLocaleString()}`
                    }
                },
                series: [
                    {
                        name: 'Projected revenue',
                        type: 'bar',
                        barWidth: '6px',
                        data: data2,
                        barGap: '30%',
                        label: {show: false},
                        itemStyle: {
                            borderRadius: [2, 2, 0, 0],
                            color: getColor('primary')
                        }
                    },
                    {
                        name: 'Actual revenue',
                        type: 'bar',
                        data: data1,
                        barWidth: '6px',
                        barGap: '30%',
                        label: {show: false},
                        z: 10,
                        itemStyle: {
                            borderRadius: [2, 2, 0, 0],
                            color: getColor('info-100')
                        }
                    }
                ],
                grid: {
                    right: 0,
                    left: 3,
                    bottom: 0,
                    top: '15%',
                    containLabel: true
                },
                animation: false
            });

            echartSetOption(chart, userOptions, getDefaultOptions);
        }
    };

    const {docReady: docReady} = window.phoenix.utils;
    docReady(chartBarInit), docReady(appCalendarInit);
    docReady(projectionVsActualChartInit);

    // Gọi hàm khởi tạo biểu đồ khi trang được load
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            chartBarInit();
            appCalendarInit();
        });
    });

    /** Hàm trả trang lỗi*/
    function errorCallback() {
        $location.path('/admin/internal-server-error')
    }

    $scope.clock = {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString()
    };

    $interval(function () {
        let now = new Date();
        $scope.clock.currentDate = now.toLocaleDateString();
        $scope.clock.currentTime = now.toLocaleTimeString();
    }, 1000);

    $scope.getAllCount = function () {
        $scope.isLoading = true;
        RevenueServiceAD.countAll()
            .then(function (response) {
                //console.log(response.data.data)
                $scope.countAmount = response.data.data;
            }, errorCallback).finally(function () {
            $scope.isLoading = false;
        });
    };


    const columnChart = async (t) => {
        $scope.isLoading = true;

        let xValues = [];
        let yValues = [];
        let maxValue = 200;

        await RevenueServiceStaff.getAllRevenueYear4()
            .then(function (response) {
                const chartData = response.data.data;

                chartData.forEach(item => {
                    xValues.push(item.year);
                    yValues.push(item.totalRevenue);
                });
                maxValue = Math.max(...yValues);
                const lastIndex = yValues.length - 1;
                const lastValue = yValues[lastIndex];
                yValues[lastIndex] = {value: lastValue, itemStyle: {color: t("primary-300")}};
            }, errorCallback).finally(function () {
                $scope.isLoading = false;
            });

        $scope.yearList = xValues;
        $scope.totalRevenue = yValues;

        const roundMaxRevenue = (maxRevenue) => {
            let roundedMax = Math.ceil(maxRevenue / 2) * 2;

            let roundedValue = Math.pow(10, Math.floor(Math.log10(roundedMax))) / 2;
            return Math.round(roundedMax / roundedValue) * roundedValue;
        };
        $scope.maxRevenue = roundMaxRevenue(maxValue) / 5;

        return yValues;
    };

    function formatNumberWithMillion(value) {
        const millions = value / 1000000; // Chia cho 1 triệu
        const formatted = new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 1 // Số lượng số thập phân tối đa là 1
        }).format(millions);
        return `${formatted} Tr`; // Thêm đơn vị Triệu
    }

    $scope.getAllCount();

    $scope.labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
    $scope.data = [];
    $scope.tourTypeId = null;
    $scope.year = new Date().getFullYear();

    $scope.options = {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 2000
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            y: {
                beginAtZero: true,
                type: 'linear',
                display: true,
                position: 'left',
            },
        },
        elements: {
            line: {
                tension: 0.4,
                borderWidth: 1.5,

            }
        }
    };

    ToursTypeServiceAD.getAllTourTypes().then((response) => {
        $scope.tourTypesList = response.data;
    });
    RevenueServiceStaff.getAllYear().then((response) => {
        $scope.selectYearList = response.data.data;
    });


    const updateChart = () => {
        const ctx = document.getElementById('line').getContext('2d');

        if ($scope.chart) {
            $scope.chart.data.labels = $scope.labels;
            $scope.chart.data.datasets[0].data = $scope.data;
            $scope.chart.update();
        } else {
            // Nếu chưa tồn tại, tạo mới biểu đồ
            $scope.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: $scope.labels,
                    datasets: [{
                        data: $scope.data,
                        borderColor: '#ff6384',
                        backgroundColor: function (context) {
                            let chartArea = context.chart.chartArea;
                            if (!chartArea) {
                                return 'rgba(255, 99, 132, 0.2)';
                            }
                            let gradientStroke = context.chart.ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                            gradientStroke.addColorStop(0, 'rgba(255, 99, 132, 0.2)');
                            gradientStroke.addColorStop(1, 'rgba(255, 159, 64, 0.2)');
                            return gradientStroke;
                        },
                        fill: true
                    }]
                },
                options: $scope.options
            });

        }
    }

    $scope.getRevenueByTourTypeIdAndYear = function () {
        RevenueServiceStaff.getAllRevenueByTourTypeIdAndYear($scope.tourTypeId, $scope.year)
            .then((response) => {
                if (response.data.status === '200') {
                    $scope.data = response.data.data;
                } else {
                    $scope.data = new Array(12).fill(0);
                }
                updateChart();
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API', error);
                $scope.data = new Array(12).fill(0);
                updateChart();
            });
    };


    angular.element(document).ready(function () {
        $scope.getRevenueByTourTypeIdAndYear();
    });

    $scope.$watchGroup(['tourTypeId', 'year'], function (newValues, oldValues) {
        if (newValues !== oldValues) {
            $scope.getRevenueByTourTypeIdAndYear();
        }
    });


})
