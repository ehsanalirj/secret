import React, { useRef } from 'react';

const toolbarButtons = [
  { cmd: 'undo', icon: <span>↺</span>, label: 'Undo' },
  { cmd: 'redo', icon: <span>↻</span>, label: 'Redo' },
  { cmd: 'bold', icon: <b>B</b>, label: 'Bold' },
  { cmd: 'italic', icon: <i>I</i>, label: 'Italic' },
  { cmd: 'underline', icon: <u>U</u>, label: 'Underline' },
  { cmd: 'insertUnorderedList', icon: <span>• List</span>, label: 'Bullets' },
  { cmd: 'insertOrderedList', icon: <span>1. List</span>, label: 'Numbered List' },
  { cmd: 'formatBlock', arg: 'h2', icon: <span style={{fontWeight:'bold'}}>H2</span>, label: 'Heading' },
  { cmd: 'createLink', icon: <span>🔗</span>, label: 'Link' },
  { cmd: 'insertImage', icon: <span>🖼️</span>, label: 'Insert Image' },
];

export default function RichTextEditor({ value = '', onChange }) {
  const ref = useRef();
  const [showImageModal, setShowImageModal] = useState(false);
  const [media, setMedia] = useState([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    if (showImageModal) {
      const saved = window.localStorage.getItem('vontres_media');
      setMedia(saved ? JSON.parse(saved) : []);
    }
  }, [showImageModal]);

  useEffect(() => {
    // Check undo/redo state
    const handler = () => {
      setCanUndo(document.queryCommandEnabled('undo'));
      setCanRedo(document.queryCommandEnabled('redo'));
    };
    document.addEventListener('selectionchange', handler);
    handler();
    return () => document.removeEventListener('selectionchange', handler);
  }, []);

  const handleInput = () => {
    if (onChange) onChange(ref.current.innerHTML);
    setCanUndo(document.queryCommandEnabled('undo'));
    setCanRedo(document.queryCommandEnabled('redo'));
  };

  const handleCommand = (cmd, arg) => {
    if (cmd === 'createLink') {
      const url = prompt('Enter link URL:');
      if (url) document.execCommand(cmd, false, url);
    } else if (cmd === 'formatBlock' && arg) {
      document.execCommand(cmd, false, arg);
    } else if (cmd === 'insertImage') {
      setShowImageModal(true);
      return;
    } else if (cmd === 'undo' || cmd === 'redo') {
      document.execCommand(cmd);
    } else {
      document.execCommand(cmd, false, arg || null);
    }
    handleInput();
    ref.current.focus();
  };

  function insertImageAtCursor(url) {
    document.execCommand('insertImage', false, url);
    setShowImageModal(false);
    handleInput();
    ref.current.focus();
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Rich Text Editor</h2>
      <div className="flex gap-2 mb-3">
        {toolbarButtons.map((btn, i) => {
          let disabled = false;
          if (btn.cmd === 'undo') disabled = !canUndo;
          if (btn.cmd === 'redo') disabled = !canRedo;
          return (
            <button
              key={i}
              type="button"
              className={`px-2 py-1 rounded hover:bg-blue-100${disabled ? ' opacity-40 cursor-not-allowed' : ''}`}
              title={btn.label}
              onMouseDown={e => { e.preventDefault(); if (!disabled) handleCommand(btn.cmd, btn.arg); }}
              disabled={disabled}
            >
              {btn.icon}
            </button>
          );
        })}
      </div>
      <div
        ref={ref}
        className="border rounded min-h-[120px] px-3 py-2 bg-white focus:outline-blue-400"
        contentEditable
        role="textbox"
        aria-multiline="true"
        tabIndex={0}
        spellCheck
        onInput={handleInput}
        onBlur={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        style={{fontFamily: 'inherit', fontSize: '1rem'}}
      />
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-4 max-w-lg w-full">
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-lg">Insert Image</div>
              <button className="text-gray-500 hover:text-black" onClick={() => setShowImageModal(false)}>✕</button>
            </div>
            <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {media.length === 0 ? (
                <div className="col-span-3 text-gray-500">No images found in Media Library.</div>
              ) : (
                media.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={img.name}
                    className="w-full h-20 object-cover rounded shadow cursor-pointer hover:ring-2 hover:ring-blue-600"
                    onClick={() => insertImageAtCursor(img.url)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
