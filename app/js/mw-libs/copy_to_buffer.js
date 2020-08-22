/*
 * . copyToBuffer
 * ----------------------------------------------------------------- 
 */ 

/*
По клику по элементу копирует его текст в буфер клавиатуры
// Call: copyToBuffer('code, .label', 
    { 
        showTooltip: 1 // {boolean} - show Tooltip when copied ?
    });
*/


    /**
     * Copy text to buffer when click on element
     *
     * @param      {string}  querySelector  The query selector
     * @param      {obj}     [options={}]   The options
     * @return     {}  
     */

    function copyToBuffer (querySelector, options = {}) {


        $(querySelector).on('click', function () {

            let tempBuffer = createTempBuffer();

            copyToTempBuffer(this, tempBuffer); 

            document.execCommand("copy");


            if ( options.showTooltip == true )
                showTooltip(this);

        });


        function createTempBuffer (argument) {
            $('.tempDocBuffer').remove();            
            $('body').append('<textarea id="tempDocBuffer" class="tempDocBuffer" style="_display: none;"></textarea>');

            return $('#tempDocBuffer');
        }     

        function copyToTempBuffer (targetObj, tempBuffer) {

            let copyText = $(targetObj).text();
            tempBuffer.text(copyText).select();
        }

        function showTooltip (targetObj) {
            
            $('.copyTooltip').remove();            
            $(targetObj).append('<div class="copyTooltip" style="background: #ddd; border: 1px solid #aaa; padding: 10px; position: absolute; cursor:pointer;">Скопировано в буфер</div>');

            // Удаление tooltip
            $('.copyTooltip').on('mouseleave', function () {
                console.log('Навели');
                $('.copyTooltip').remove();
            });            
        }
    }