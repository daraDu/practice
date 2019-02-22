        $(function () {  
            $.fn.mergeCell = function (options) {  
                return this.each(function () {  
                    var cols = options.cols;  
                    for (var i = cols.length - 1; cols[i] != undefined; i--) {   
                        mergeCell($(this), cols[i]);  
                    }  
                    dispose($(this));  
                });  
            };  
            function mergeCell($table, colIndex) {  
                $table.data('col-content', '');    
                $table.data('col-rowspan', 1); 
                $table.data('col-td', $()); 
                $table.data('trNum', $('tbody tr', $table).length);  
                $('tbody tr', $table).each(function (index) {   
                    var $td = $('td:eq(' + colIndex + ')', this);  
                    var currentContent = $td.html();  
                    if ($table.data('col-content') == '') {  
                        $table.data('col-content', currentContent);  
                        $table.data('col-td', $td);  
                    } else {  
                        if ($table.data('col-content') == currentContent) {   
                            var rowspan = $table.data('col-rowspan') + 1;  
                            $table.data('col-rowspan', rowspan);    
                            $td.hide();   
                            if (++index == $table.data('trNum'))  
                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));  
                        } else {
                            if ($table.data('col-rowspan') != 1) {  
                                $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));  
                            }  
                            $table.data('col-td', $td);  
                            $table.data('col-content', $td.html());  
                            $table.data('col-rowspan', 1);  
                        }  
                    }  
                });  
            }  
            // 同样是个private函数 清理内存之用   
            function dispose($table) {  
                $table.removeData();  
            }  
            $('#process').mergeCell({  
                // 目前只有cols这么一个配置项, 用数组表示列的索引,从0开始   
                // 然后根据指定列来处理(合并)相同内容单元格   
                cols: [0, 1, 2, 3]  
            });  
        });  
        //; (function ($) {  
             
        //})(jQuery);  
  
        function dd() {   
            $('#process').mergeCell({   
                cols: [0,1,2,3]  
            });  
        } 