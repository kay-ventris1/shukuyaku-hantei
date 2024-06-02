let x = [];

const original_indices = (S, T) => {
    let Ls = S.length;
    let Lt = T.length;
    let ind = [];
    for (let i = 0; i < Lt; i++) {
        ind.push(-1);
    }
    let track = 0;
    for (let i = 0; i < Lt; i++) {
        if (track == Ls) {
            break;
        }
        if (T[i] == S[track]) {
            ind[i] = track;
            track++;
        } 
        else {
            let fixed = track;
            while (track < Ls) {
                if (T[i] == S[track]) {
                    ind[i] = track;
                    track++;
                    break;
                } 
                else {
                    track++;
                }
            }
            if (track == Ls) {
            	x.push(track);
                track = fixed;
            }
        }
    }
    return ind;
}

document.getElementById('judge-button').addEventListener('click', () => {
    let S = document.getElementById('original').value;
    let T = document.getElementById('abridged').value;

    let array = original_indices(S, T);

    let problems = [];
    for (let i = 0; i < T.length; i++) {
    	if (array[i] == -1) {
    		problems.push(i + 1);
    	}
    }

    if (!array.includes(-1)) {
        Swal.fire({
            title: '',
            text: '正しく縮約されています。',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } else {
    	let message = '縮約のルールが守られていません。<br> 次の文字は、縮約前のテキストには存在しません：<br><br>';
        for (let i = 0; i < problems.length; i++) {
        	message += problems[i].toString() + '番目の文字: ' + T[problems[i] - 1] + '<br>';
        }
        Swal.fire({
            title: '',
            html: message,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});
